import api from './limit';
import refreshToken from './refreshToken';

const makeRequest = async (url) => {
  const token = await refreshToken();

  const dataToReturn = [];

  const bucketMax = [];
  const currentBucket = [];

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header,
  };

  const get = await api
    .get(url, axiosConfig)
    .catch((err) => console.error(err.response.status, err.response.statusText));

  const bucketLevel = get.headers['x-ls-api-bucket-level'].split('/');
  bucketMax.push(parseInt(Math.ceil(bucketLevel[1])));
  currentBucket.push(parseInt(Math.ceil(bucketLevel[0])));
  console.log(currentBucket, bucketMax);

  // Get Pages Count
  const recordCount = parseInt(get.data['@attributes'].count);
  const pages = Math.ceil(recordCount / 100);

  for (let i = 0; i < pages; i++) {
    const res = await api.get(`${url}&offset=${i * 100}`, axiosConfig).catch((err) => console.error(err));

    const { data } = res;

    const arrayName = Object.keys(data)[1];
    const selectedData = await data[arrayName];

    if (selectedData instanceof Array) {
      selectedData.map((item) => dataToReturn.push(item));
    } else dataToReturn.push(selectedData);

    if (i + 1 === pages) {
      return dataToReturn;
    }
  }
};

export default makeRequest;
