const Randomstring =require("randomstring");
const responseObj = (statusCode, data) => {
  return {
    statusCode: statusCode,
    headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "PUT,POST,GET",
    },
   body: JSON.stringify(data)
  };
};

const requestObj = (data) => {
  return JSON.parse(data);
}

const token=(name)=>{
  id =Randomstring.generate({
    length: 9,
    charset: 'alphabetic',
    capitalization :"lowercase"
  });
  const finalt="-"+id.match(/.{3}/g).join("-")
  return finalt
}

module.exports = { responseObj: responseObj, requestObj: requestObj,token:token }