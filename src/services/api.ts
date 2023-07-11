import axios, { AxiosError } from "axios";
import { parseCookies } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

// Recebe como parâmetro o contexto da aplicação
export function getAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3334',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  });

  api.interceptors.request.use(config => {
    return config;
  }, (error: AxiosError) => {
    if(error.response?.status === 401) {
      // Qualquer erro de autenticação, desloga o usuário e redireciona para a página de login
      if(typeof window === 'undefined') {
        signOut();
      } else {
        return Promise.reject(new AuthTokenError());
      }
    }

    return Promise.reject(error);
  });

  // if (cookies) {
  //   api.defaults.headers['Authorization'] = `Bearer ${cookies}`;
  // }

  return api;
}
