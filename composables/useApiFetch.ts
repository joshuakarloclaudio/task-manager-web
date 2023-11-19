export const useApiFetch: typeof useFetch = (request, options?) => {
  const config = useRuntimeConfig();

  let headers: any = {};

  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['referer', 'cookie']),
    };
  }

  return useFetch(request, {
    baseURL: config.public.baseUrl,
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      ...headers,
      ...options?.headers,
    },
    watch: false,
  });
};
