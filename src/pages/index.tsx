import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../public/logo.jpg'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Home() {
  return (
    <>
      <Head>
      <title>Influency Guild - Faça o login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Influency Guild" />
        <div className={styles.login}>
          <form>
            <Input type='text' placeholder='Digite seu e-mail'/>
            <Input type='password' placeholder='Digite sua senha'/>
            <Button type='submit' loading={false}>Acessar</Button>
          </form>
          <a className={styles.text}>Ainda não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  )
}
