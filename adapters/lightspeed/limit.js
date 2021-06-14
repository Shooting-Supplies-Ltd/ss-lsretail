import axios from 'axios';
import refreshToken from './refreshToken';

const MAX_REQUESTS_COUNT = 1;
const INTERVAL_MS = 1000;
let PENDING_REQUESTS = 0;

// create new axios instance
const api = axios.create({ retry: 3, retryDelay: 10000 });

/**
 * Axios Request Interceptor
 */
api.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++;
        clearInterval(interval);
        resolve(config);
      }
    }, INTERVAL_MS);
  });
});

/**
 * Axios Response Interceptor
 */
api.interceptors.response.use(
  function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
  },
  async function (error) {
    const { config } = error;
    console.log(config);

    if (error.response.status === 401 && !config._retry) {
      console.log('Error 401');
      config._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      console.log(`Token Pulled ${access_token}`);
      return api(config);
    }

    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

    if (!config || !config.retry) return Promise.reject(err);

    if (config.__retryCount >= config.retry) {
      // Reject with the error
      console.log('Too many retries');
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    const backoff = new Promise(function (resolve) {
      console.log('Backoff Used');
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 10000);
    });

    return backoff.then(function () {
      return axios(config);
    });
  }
);

export default api;
