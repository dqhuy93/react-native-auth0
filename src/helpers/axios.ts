import axios from 'axios';
// import { store } from '../store';
// import { setLogout } from '../store/app/appSlice';
import { getData } from './storage';
import { API_URL, AUTH_TOKEN, DEFAULT_TIMEOUT } from '../constant';

// create instance normal
const instanceAxios = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
});

/**
 * @description: config header Authorization each send request
 */
instanceAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await getData(AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * @description: handle response interceptor
 */
instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (
    //   401 === error.response.status &&
    //   window.location.pathname !== ROUTE_PATH.login
    // ) {
    //   store.dispatch(setLogout(true));
    //   return;
    // }

    // const errorContent = error.response ?? error.request ?? error.message;
    return Promise.reject(error);
  },
);

export async function fetchAll(requests: Promise<never>[]) {
  return axios.all(requests);
}

const http = instanceAxios;
export default http;
