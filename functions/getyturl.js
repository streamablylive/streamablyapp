const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  const claims = context.clientContext && context.clientContext.user; 
  if (!claims) {
    return {statusCode: 401};
  }

  try {
    let avenger = await clientQuery.query(
      q.Call(q.Function("getyturl"), data.uid)
    );
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(error);
  }
 
};
