import {getAuth, signInWithEmailAndPassword, signOut} from "@firebase/auth";
import logging from "@utils/logging";

export default class AuthService {

    static loginWithEmail = (email: string, password): Promise<string> => {
        try {
            const auth = getAuth();
            return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => userCredential.user.uid)
        } catch (e) {
            const message = `Error while signing in user: ${e.message || e}`
            logging.error(message)
            return Promise.reject(message)
        }
    }

    static logOut = (): Promise<void> => {
        try {
            const auth = getAuth();
            return signOut(auth)
        } catch (e) {
            const message = `Problem occurred when signing out user: ${e.message || e}`
            logging.error(message)
            return Promise.reject(message)
        }

    }

}
