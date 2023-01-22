import React, {useEffect} from 'react'
import {AppProps} from 'next/app'

import '../styles/global.css'
import Header from "@components/shared/Header";
import store from "../context/redux/store";
import {Provider} from "react-redux";
import {initializeFirebase} from "@utils/firebase";
import AppContent from "@components/shared/AppContent";

function MyApp({Component, pageProps}: AppProps) {

    useEffect(() => {
        initializeFirebase()
    }, [])

    return <>
        <Provider store={store}>
            <AppContent>
                <Header/>
                <div className={`flex justify-center align-center w-screen min-h-screen max-h-fit p-0 m-0`}>
                    <Component {...pageProps} />
                </div>
            </AppContent>
        </Provider>
    </>
}

export default MyApp

