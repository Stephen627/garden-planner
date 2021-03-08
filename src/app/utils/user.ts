import FirebaseAuthenticator from "./authenticator/firebase/FirebaseAuthenticator";
import LocalAuthenticator from "./authenticator/local/LocalAuthenticator";
import Authenticator from "./authenticator";
import Config from './config';

const Auth = new Authenticator();

switch (Config.get('auth_adapter')) {
    case 'local':
        const localAuth = new LocalAuthenticator();
        Auth.setAuthenticator(localAuth);
    case 'firebase':
    default:
        const firebaseAuth = new FirebaseAuthenticator();
        Auth.setAuthenticator(firebaseAuth);
        break;
}

export {
    Auth,
}