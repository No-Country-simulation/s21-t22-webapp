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

  // Recupera del token del Local Storage (guardada como "access_token") si es que existe y lo agrega a los headers de la petición.
  const token = window.localStorage.getItem('access_token') || null;

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

/**
 * Realiza una solicitud GET a la API.
 * @template T - Tipo de dato esperado en la respuesta.
 * @param {string} endpoint - Ruta de la API a la que se hará la solicitud.
 * @param {Record<string, any>} [headers] - Opcional. Headers adicionales para la solicitud.
 * @returns {Promise<T>} - Promesa que resuelve con la respuesta de la API.
 */
export const getRequest = <T>(endpoint: string, headers?: Record<string, any>): Promise<T> =>
  httpRequest<T>('get', endpoint, null, headers);

/**
 * Realiza una solicitud POST a la API.
 * @param {string} endpoint - Ruta de la API a la que se hará la solicitud.
 * @param {any} data - Datos que se enviarán en el cuerpo de la solicitud.
 * @param {Record<string, any>} [headers] - Opcional. Headers adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve con la respuesta de la API.
 */
export const postRequest = (
  endpoint: string,
  data: any,
  headers?: Record<string, any>
): Promise<any> => httpRequest('post', endpoint, data, headers);

/**
 * Realiza una solicitud PUT a la API.
 * @param {string} endpoint - Ruta de la API a la que se hará la solicitud.
 * @param {Record<string, any>} data - Datos que se enviarán en el cuerpo de la solicitud.
 * @param {Record<string, any>} [headers] - Opcional. Headers adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve con la respuesta de la API.
 */
export const putRequest = (
  endpoint: string,
  data: Record<string, any>,
  headers?: Record<string, any>
): Promise<any> => httpRequest('put', endpoint, data, headers);

/**
 * Realiza una solicitud PATCH a la API.
 * @param {string} endpoint - Ruta de la API a la que se hará la solicitud.
 * @param {Record<string, any>} data - Datos parciales que se enviarán en el cuerpo de la solicitud.
 * @param {Record<string, any>} [headers] - Opcional. Headers adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve con la respuesta de la API.
 */
export const patchRequest = (
  endpoint: string,
  data: Record<string, any>,
  headers?: Record<string, any>
): Promise<any> => httpRequest('patch', endpoint, data, headers);

/**
 * Realiza una solicitud DELETE a la API.
 * @param {string} endpoint - Ruta de la API a la que se hará la solicitud.
 * @param {Record<string, any>} [headers] - Opcional. Headers adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve con la respuesta de la API.
 */
export const deleteRequest = (endpoint: string, headers?: Record<string, any>): Promise<any> =>
  httpRequest('delete', endpoint, null, headers);
