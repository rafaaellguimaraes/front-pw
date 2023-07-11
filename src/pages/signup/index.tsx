import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function Home() {
  return (
    <>
      <Head>
      <title>Influency Guild - Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <h1>Faça seu cadastro</h1>
          <form>
            <Input type='text' placeholder='Digite seu e-mail'/>
            <Input type='text' placeholder='Digite seu nome'/>
            <Input type='text' placeholder='Digite seu nick'/>
            <Input type='text' placeholder='Digite sua classe'/>
            <Input type='password' placeholder='Digite sua senha'/>
            <Button type='submit' loading={false}>Cadastrar</Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
