import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

NProgress.configure({ showSpinner: false });

const Layout = (props) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.start()
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
      </Head>
      <Header />
      <div className="flex-grow">
        {props.children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout