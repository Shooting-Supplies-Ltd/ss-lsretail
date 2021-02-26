const axios = require('axios');

const refreshToken = async () => {
  const body = {
    grant_type: 'refresh_token',
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  try {
    const response = await axios({
      url: 'https://cloud.lightspeedapp.com/oauth/access_token.php',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    }).catch((err) => console.error(err));

    const accessToken = await response.data.access_token;
    return accessToken;
  } catch (error) {
    return error;
  }
};

module.exports = refreshToken;
