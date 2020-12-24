import FirebaseAuthenticator from "./authenticator/firebase/FirebaseAuthenticator";
import Authenticator from "./authenticator";

const firebaseAuth = new FirebaseAuthenticator();
const Auth = new Authenticator();

Auth.setAuthenticator(firebaseAuth);

export {
    Auth,
}