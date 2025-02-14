/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface Config {
  headers: Record<string, any>;
  data?: Record<string, any>;
  method?: string;
  url?: string;
}

const httpRequest = <T>(
  verb: string,
  endpoint: string,
  data?: Record<string, any> | null,
  headers = {}
): Promise<T> => {
  const config: Config = {
    headers,
  };

  const token = window.localStorage.getItem('access_token') || null; // Recupera del token del Local Storage (guardada como "access_token") si es que existe y la agrega a los HEADERS de la petición

  if (typeof token === 'string') {
    const parsedToken = JSON.parse(token);

    config.headers.Authorization = `Bearer ${parsedToken}`;
  }

  config.method = verb;

  config.url = import.meta.env.VITE_API_URL + '/api' + endpoint;

  if (data) config.data = data;

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const getRequest = <T>(endpoint: string, headers?: Record<string, any>): Promise<T> =>
  httpRequest<T>('get', endpoint, null, headers);

export const postRequest = (
  endpoint: string,
  data: any,
  headers?: Record<string, any>
): Promise<any> => httpRequest('post', endpoint, data, headers);

export const putRequest = (
  endpoint: string,
  data: Record<string, any>,
  headers?: Record<string, any>
): Promise<any> => httpRequest('put', endpoint, data, headers);

export const patchRequest = (
  endpoint: string,
  data: Record<string, any>,
  headers?: Record<string, any>
): Promise<any> => httpRequest('patch', endpoint, data, headers);

export const deleteRequest = (endpoint: string, headers?: Record<string, any>): Promise<any> =>
  httpRequest('delete', endpoint, null, headers);
