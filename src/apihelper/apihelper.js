import axios from "axios";
import Bottleneck from "bottleneck";

const x = localStorage.getItem("gotrue.user");
var auth = JSON.parse(x)?.token.access_token;

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 5000,
});

const submit = async (api, body) => {
  const res = await axios.post(`/.netlify/functions/${api}`, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  return res;
};
const wrapped = limiter.wrap(submit);

export async function POST(api, body) {
  const x = localStorage.getItem("gotrue.user");
  auth = JSON.parse(x)?.token.access_token;

  const response = await wrapped(api, body);
  return response;
}
