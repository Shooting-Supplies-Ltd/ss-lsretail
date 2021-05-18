import axios from 'axios';

const MAX_REQUESTS_COUNT = 1;
const INTERVAL_MS = 4000;
let PENDING_REQUESTS = 0;

// create new axios instance
const api = axios.create({});

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
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    await new Promise(function (res) {
      setTimeout(function () {
        res();
      }, 2000);
    });

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshedHeader = await setHeader();
      axios.defaults.headers = refreshedHeader;
      originalRequest.headers = refreshedHeader;
      return Promise.resolve(axios(originalRequest));
    }
    return Promise.reject(error);
  }
);

export default api;
