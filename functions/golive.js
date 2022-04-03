const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  const match = data.url.match(regExp);
  const code= (match && match[1].length==11)? match[1] : false;
  const claims = context.clientContext && context.clientContext.user; 
  if (!claims) {
    return {statusCode: 401};
  }
  if (code===false){
    return {statusCode: 404};
  }
  try {
    let avenger = await clientQuery.query(
      q.Let({                              
        uid:data.uid,
        user_match: q.Match(q.Index("user_match"), q.Var("uid")),
        ug: q.If(q.Exists(q.Var("user_match")), q.Get(q.Var("user_match")), null),
      },
      q.If(
        q.IsNull(q.Var("ug")), 
          "lafda ho gya", 
          q.Update(q.Select(["ref"],q.Var("ug")),{
            data: {
              yturl: code
            }
          })
        )
      )
    );
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(error);
  }
 
};
