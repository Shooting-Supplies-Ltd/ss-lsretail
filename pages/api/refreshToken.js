import rateLimit from 'axios-rate-limit';

const axios = require('axios');

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000 });

const refreshToken = async () => {
  const body = {
    grant_type: 'refresh_token',
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  const response = await http({
    url: 'https://cloud.lightspeedapp.com/oauth/access_token.php',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  }).catch((err) => console.error(err));

  const accessToken = await response.data.access_token;
  return accessToken;
};

module.exports = refreshToken;
