import Notifications from "@components/shared/Notifications/Notifications";
import Spinner from "@components/shared/Spinner/Spinner";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {revokeAuthentication, saveAuthUser, setUserStateAsync, userStateSelector} from "@context/redux/user/userSlice";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import AuthService from "@service/authService";
import logging from "@utils/logging";

export default function AppContent(props) {
    const router = useRouter()
    const dispatch = useDispatch()

    const userState = useSelector(userStateSelector)

    useEffect(() => {
        dispatch(setUserStateAsync(true))
        try {
            if (!userState.isAuthenticated) {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
                    const logoutAndRedirect = () => {
                        logging.warn(`user is not allowed. ${user?.uid}`)
                        dispatch(revokeAuthentication())
                        return AuthService
                            .logOut()
                            .catch(err => {
                                logging.error(`Logout err ${err.message || err}`)
                                return Promise.reject(err)
                            })
                            .finally(() => {
                                return router.replace(`/login`)
                            })
                    }
                    if (user) {
                        const ids = process.env.NEXT_PUBLIC_FIREBBASE_ADMIN_IDS
                        if (ids?.includes(user.uid)) {
                            logging.info(`Logged in ${user?.uid?.substring(0, 3)}`)
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            const userId = user.uid;
                            dispatch(saveAuthUser({userId}))
                            await checkForCorrectRoute()
                        } else await logoutAndRedirect()
                    } else await logoutAndRedirect()
                });
            }
        } catch (e) {
            logging.error(`Error in auto-login ${e.message || e}`)
        }
        dispatch(setUserStateAsync(false))
    }, [userState.isAuthenticated])

    const checkForCorrectRoute = (isAsync = false) => {
        if (router.pathname !== `/login`) {
            if (!isAsync) {
                if (router.pathname === '/[...pages]')
                    return router.replace("/")
                else return Promise.resolve(saveLastVisitedPage())
            }
            if (!userState.isAuthenticated)
                return router.replace(`/login`)
        } else if (!userState.isAuthenticated)
            if (!userState.isAsync) {
                return router.replace(`/`)
            }

    }

    const saveLastVisitedPage = () => {
        const lastPage = window.location.pathname
        if (lastPage !== "/login") {
            sessionStorage.setItem(`previousPage`, lastPage)
        }
    }

    useEffect(() => {
        saveLastVisitedPage()
    }, [router.pathname])

    return (
        <main className={`flex flex-row min-h-max w-full relative`}>
            <Notifications/>
            {router.isFallback || userState.isAsync
                ? <Spinner size={100} classes={`m-auto mt-20`}/>
                : <div className={`max-w-screen w-screen min-h-screen overflow-hidden m-0 `}>
                    {props.children}
                </div>
            }
        </main>
    )
}
