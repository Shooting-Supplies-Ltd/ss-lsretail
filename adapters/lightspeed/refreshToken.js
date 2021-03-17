import api from './limit';

const refreshToken = async () => {
  const body = {
    grant_type: 'refresh_token',
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  const response = await api({
    url: 'https://cloud.lightspeedapp.com/oauth/access_token.php',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  }).catch((err) => console.error(err));

  const accessToken = await response.data.access_token;
  const data = await response.data;
  console.log(data);
  return accessToken;
};

module.exports = refreshToken;
