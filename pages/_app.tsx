import React from 'react'
import {AppProps} from 'next/app'

import '../styles/global.css'

function MyApp({Component, pageProps}: AppProps) {
    return <div className={`flex justify-center align-center w-full min-h-screen max-h-fit`}>
        <Component {...pageProps} />
    </div>
}

export default MyApp

