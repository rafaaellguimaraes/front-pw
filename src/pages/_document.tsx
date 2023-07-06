import { Head, Html, Main, NextScript } from 'next/document'

// O Document, faz com que o Next.js renderize o HTML da página apenas uma vez e não a cada requisição
export default function Document() {
  return (
    // O Html, faz com que o Next.js renderize o HTML da página
    // O Head, faz com que o Next.js renderize o head da página
    // O Main, faz com que o Next.js renderize o conteúdo da página
    // O NextScript, faz com que o Next.js renderize os scripts da página
    <Html>
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
