import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { AuthContext } from '../../contexts/AuthContext'

export default function Home() {
  const { signUp } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [classChar, setClassChar] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!email || !password || !name || !nick || !classChar) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
      name,
      nick,
      classChar
    }

    await signUp(data)
    setLoading(false);
  }

  return (
    <>
      <Head>
      <title>Influency Guild - Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <h1>Faça seu cadastro</h1>
          <form onSubmit={handleSignUp}>
            <Input
              type='text'
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            <Input
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}/>
            <Input
              type='text'
              placeholder='Digite seu nick'
              value={nick}
              onChange={(e) => setNick(e.target.value)}/>
            <Input
              type='text'
              placeholder='Digite sua classe'
              value={classChar}
              onChange={(e) => setClassChar(e.target.value)}/>
            <Input
              type='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>

            <Button type='submit' loading={loading}>Cadastrar</Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
