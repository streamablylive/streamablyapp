const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event) => {
  let data = requestObj(event.body);
  console.log(data);
  try {
    let avenger = await clientQuery.query(
      q.Do(
        q.Create(
          q.Collection("user"),
          {
            data: {
              name:data.user.user_metadata.full_name,
              wname:data.user.user_metadata.web_name,
              uid: data.user.id,
              frnds: [],
              favfrnds: []
            }
          }
        )
      )
      );
    const responseBody = {
      app_metadata: {
        ...data.user.app_metadata,
        roles: ["user"],

      }
    };
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    };
  }catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
};

/**
const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler =  (event) => {
  //let data = requestObj(event.body);
  //const claims = context.clientContext && context.clientContext.user;
  try {
    console.log("data");
    return responseObj(200, "error");
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};
**/
//https://streamitb.netlify.app/.netlify/functions/identity-signup-manual

