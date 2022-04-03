var jwt = require('jsonwebtoken');
var uuid4 = require('uuid4');
const { requestObj, responseObj } = require('./utils/helper');

var app_access_key = '61543abf5aa184b310bc8b10';
var app_secret = 'P5mqhBfojmH7NGDrBbeEz-CFlDU2Z6uDTlj9L0uJgKAd0jt4-iuyAcbjv2UFNFsgjRTzLB9hD2qgueg8AnLgoqCel3sTp58WBTW5KgS4ycbBFtsIj0wyXDwsi3eBWdGQoNfHFyboR53ntVF5XBoJQXecbZ0g09R1x_nKcl2wdto=';

exports.handler = (event, context) => {
  let data = requestObj(event.body);
  if (data.password !== "piyush") {
    return {statusCode: 401};
  }
  try{
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
    return responseObj(200, token);
  }catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};

