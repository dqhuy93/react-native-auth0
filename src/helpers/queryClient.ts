import Toast from 'react-native-toast-message';
import { QueryClient } from '@tanstack/react-query';
import { RequestMethod, DEFAULT_TIMEOUT, API_URL } from '../constant';
import http from './axios';
import { responseMessage } from './utils';

export const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  try {
    const [url, method = 'GET', data = {}, headers = {}] = queryKey;
    const isGetOrDelete = [RequestMethod.DELETE, RequestMethod.GET].includes(
      method,
    );
    const requestOptions = {
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json', ...headers },
      timeout: DEFAULT_TIMEOUT,
      method: method,
      url: url,
      ...(isGetOrDelete ? {} : { data: data }),
    };

    const { data: responseData } = await http(requestOptions);
    return responseData;
  } catch (error: any) {
    Toast.show({
      text1: responseMessage(error),
      type: 'error',
    });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default queryClient;
