import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import logoImg from '../../public/logo.jpg'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email,
      password
    }

    await signIn(data)
  }


  return (
    <>
      <Head>
      <title>Influency Guild - Faça o login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Influency Guild" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type='text'
              placeholder='Digite seu e-mail'
              value={email}
              onChange={event => setEmail(event.target.value)}
              />
            <Input
              type='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={event => setPassword(event.target.value)}
              />

            <Button type='submit' loading={false}>Acessar</Button>
          </form>
          <Link href="/signup" legacyBehavior>

            <a className={styles.text}>Ainda não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
