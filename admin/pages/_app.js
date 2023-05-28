import '@/styles/globals.css'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {

  if(Component.getLayout)   return <Component {...pageProps} />

 else{ return <Layout><Component {...pageProps} /></Layout>}
}
