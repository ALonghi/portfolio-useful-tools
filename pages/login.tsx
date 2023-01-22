import AuthService from "../service/authService";
import {useEffect, useState} from "react";
import {createNotification, ToastData} from "@context/redux/toast/toastSlice";
import {nanoid} from "nanoid";
import {useDispatch, useSelector} from "react-redux";
import {saveAuthUser, userStateSelector} from "@context/redux/user/userSlice";
import {useRouter} from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch()
    const router = useRouter()

    const userState = useSelector(userStateSelector)

    useEffect(() => {
        if (userState.isAuthenticated) {
            const previousPage = sessionStorage.getItem(`previousPage`)
            if (previousPage && previousPage !== "/login")
                router.replace(previousPage)
            else router.replace(`/`)
        }
    }, [userState.isAuthenticated])

    const inputIsValid = (): boolean => {
        return email?.length > 0 && password?.length > 0
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (inputIsValid()) {
            await AuthService
                .loginWithEmail(email, password)
                .then(userId => {
                    console.log(`@@ user id ${userId}`)
                    dispatch(saveAuthUser({userId: userId}))
                })
                .then(_ => {
                    const notification: ToastData = {
                        id: nanoid(16),
                        details: "Successfully logged in.",
                        type: `success`,
                        hidden: false,
                    }
                    createNotification(dispatch, notification)
                    return router.replace("/")
                })
                .catch(err => {
                    const msg = `Sign in error: ${err.message || err}`
                    const notification: ToastData = {
                        id: nanoid(16),
                        details: msg,
                        type: `error`,
                        hidden: false,
                    }
                    createNotification(dispatch, notification)
                })
        } else {
            const notification: ToastData = {
                id: nanoid(16),
                details: "You need a valid email and password to log in.",
                type: `info`,
                hidden: false,
            }
            createNotification(dispatch, notification)
        }


    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your
                        account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
