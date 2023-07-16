import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

// Tem uma propriedade user que recebe as informações do usuário
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpData) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  nickname: string;
  classe: string;
}

type SignInData = {
  email: string;
  password: string;
}

type SignUpData = {
  email: string;
  password: string;
  name: string;
  nick: string;
  classChar: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  // O undefined é para dizer que é para remover o cookie de qualquer domínio
  // O @nextauth.token é o nome do cookie
  // O destroyCookie é uma função do pacote nookies que remove o cookie do navegador do usuário
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch(err){
    console.log(err)
  }
}

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user; // Converte o user para booleano

  useEffect(() => {
    // O get é uma função do pacote nookies que pega o cookie do navegador do usuário
    const { '@nextauth.token': token } = parseCookies()

    if(token){
      api.get('/userinfo').then(response => {
        const { id, name, email, nickname, classe } = response.data;

        setUser({
          id,
          name,
          email,
          nickname,
          classe
        })
      }).catch(() => {
        signOut()
      })
    }
  });

  async function signIn({email, password}: SignInData){
    try{
      const response = await api.post('login', {
        email,
        password
      })

      const { id, name, nickname, token, classe } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/' // O cookie vai ser válido para todas as rotas da aplicação
      })

      setUser({
        id,
        name,
        email,
        nickname,
        classe
      })

      // Passar para proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Login realizado com sucesso!')

      // Redireciona o usuário para a página de dashboard
      Router.push('/dashboard')
    }catch(err){
      console.log(err)
      toast.error('Usuário ou senha incorretos!')
    }
  }

  async function signUp({email, name, nick, classChar, password}: SignUpData){
    try{
      const response = await api.post('/users', {
        email,
        name,
        nick,
        classChar,
        password
      })

      const { id, nickname, classe } = response.data;

      setUser({
        id,
        name,
        email,
        nickname,
        classe
      })

      toast.success('Cadastro realizado com sucesso!')
      // Redireciona o usuário para a página de login
      Router.push('/')
    }catch(err){
      console.log(err)
      toast.error('Erro ao realizar cadastro!')
    }
  }

  return (
    // O value é o valor que vai ser passado para todos os componentes que estiverem dentro do AuthContext.Provider
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
