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
const disableroom=async(n)=>{
  const {data,errors} = 
  await axios.post("https://prod-in2.100ms.live/api/v2/rooms",
    {
      "name":n,
      active:false
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
var name
exports.handler = async (event, context) => {
  let data = requestObj(event.body);
  const claims = context.clientContext && context.clientContext.user;
  if (!claims) {
    return {statusCode: 401};
  }
  try {
    let avenger = await clientQuery.query(
      q.Let(
  			{
  				uid:data.uid,
          account_match: q.Match(q.Index("unique_uid_roomid"), q.Var("uid")), 
          id_is_new: q.Not(q.Exists(q.Var("account_match"))), 
          rid: q.If(q.Var("id_is_new")," ",q.Select(["data","rid"],q.Get(q.Match(q.Index("unique_uid_roomid"), q.Var("uid")))))
  			},
  			q.If(
          q.Var("id_is_new"),
          "error",
          q.Do( 
            q.Delete(q.Select(["ref"],q.Get(q.Match(q.Index("unique_uid_roomid"), q.Var("uid"))))),
            await disableroom(name),
            "room  reseted"
          )
        )
		  )
    );
    
    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};


