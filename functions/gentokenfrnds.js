const { requestObj, responseObj,token } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  const claims = context.clientContext && context.clientContext.user; 
  if (!claims) {
    return {statusCode: 401};
  }
  try {
    let avenger = await clientQuery.query(
      q.Let({                                 
          uid:data.uid,
          tvn: data.tvn,
          account: q.Match(q.Index("user_match"), q.Var("uid")),
          ug: q.If(q.Exists(q.Var("account")), q.Get(q.Var("account")), null), 
          account_match: q.Match(q.Index("unique_uid_frnds"), q.Var("uid")), 
          id_is_new: q.Not(q.Exists(q.Var("account_match"))) 
        }, 
        q.If(
          q.Not(q.IsNull(q.Var("account"))),
          q.If(
            q.Var("id_is_new"),
            q.Do(
              q.Create(
                // Store signup token for new account
                q.Collection("tokenforfrnds"),
                {
                  data: {
                      token: q.Concat([q.Select(["data","wname"],q.Var('ug')),token()]),
                      tun: 1,
                      tvn: q.Var("tvn"),
                      uid: q.Var("uid"),
                      ta:true,
                  }
                }
              ),
              q.Select(["data","token"],q.Get(q.Match(q.Index("getfrndtoken"), q.Var("uid"))))
            ),
            q.If(
              q.Select(["data","ta"],q.Get(q.Match(q.Index("getfrndtoken"), q.Var("uid")))),
              q.Select(["data","token"],q.Get(q.Match(q.Index("getfrndtoken"), q.Var("uid")))),
              q.Do( 
                q.Update(q.Select(["ref"],q.Get(q.Match(q.Index("unique_uid_frnds"), q.Var("uid")))),            
                  {
                    data: {
                      token: q.Concat([q.Select(["data","wname"],q.Var('ug')),token()]),
                      tun: 1,
                      tvn: q.Var("tvn"),
                      ta:true,
                    }
                  }
                ),
                q.Select(["data","token"],q.Get(q.Match(q.Index("getfrndtoken"), q.Var("uid"))))
              )
            ) 
          ),
          'error'       
        )
      )
    );
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};