import React from 'react'
import {AppProps} from 'next/app'

import '../styles/global.css'

function MyApp({Component, pageProps}: AppProps) {
    return <div className={`flex justify-center align-center w-screen min-h-screen max-h-fit p-0 m-0`}>
        <Component {...pageProps} />
    </div>
}

export default MyApp

