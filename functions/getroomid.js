const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');
var jwt = require('jsonwebtoken');
var uuid4 = require('uuid4');
const axios = require('axios');

var app_access_key = '61543abf5aa184b310bc8b10';
var app_secret = 'P5mqhBfojmH7NGDrBbeEz-CFlDU2Z6uDTlj9L0uJgKAd0jt4-iuyAcbjv2UFNFsgjRTzLB9hD2qgueg8AnLgoqCel3sTp58WBTW5KgS4ycbBFtsIj0wyXDwsi3eBWdGQoNfHFyboR53ntVF5XBoJQXecbZ0g09R1x_nKcl2wdto=';

const token = jwt.sign(
{
    access_key: app_access_key,
    type: 'management',
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),

},
app_secret,
{
    algorithm: 'HS256',
    expiresIn: '24h',
    jwtid: uuid4()
}
);
const createroom=async(n)=>{
  const {data,errors} = 
  await axios.post("https://prod-in2.100ms.live/api/v2/rooms",
    {
      "name":n,
      "template":"default_createown_99e32f1c-ee03-47c7-91b2-9bbec46b7f02",
      "region":"in"
    },
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }},
    
)
  if(errors){
    throw new Error(errors)
  }
  return data
}


exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  const claims = context.clientContext && context.clientContext.user; 
  if (!claims) {
    return {statusCode: 401};
  }
  const rid =uuid4()
  try {
    let avenger = await clientQuery.query(
      q.Let({                              
        uid:data.uid,
        account_match: q.Match(q.Index("unique_uid_roomid"), q.Var("uid")), 
        id_is_new: q.Not(q.Exists(q.Var("account_match"))),
        user_match: q.Match(q.Index("user_match"), q.Var("uid")),
        ug: q.If(q.Exists(q.Var("user_match")), q.Get(q.Var("user_match")), null),
      },
      q.If(
        q.IsNull(q.Var("ug")), 
          "lafda ho gya", 
          q.If(q.Var("id_is_new"),
            q.Do(
              q.Create(
                q.Collection("roomid"),
                {
                  data: {
                    uid: q.Var("uid"),
                    validtime:q.TimeAdd(q.Now(), 3, "days"),
                    roomid: (await createroom(rid)).id,
                    roomida: true,
                    rid: rid,
                  }
                }
              ),
              q.Select(["data","roomid"],q.Get(q.Match(q.Index("getroomid"), q.Var("uid"))))
            ),
            q.Do( 
              q.Select(["data","roomid"],q.Get(q.Match(q.Index("getroomid"), q.Var("uid"))))
            )
          )
        )
      )
    );
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(error);
  }
 
};