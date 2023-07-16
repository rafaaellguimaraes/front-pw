import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import logoImg from '../../public/logo.jpg'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthContext } from '../contexts/AuthContext'
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false);
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

            <Button type='submit' loading={loading}>Acessar</Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Ainda não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
