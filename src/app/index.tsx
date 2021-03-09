import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider  } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reducers from './reducers';
import { pages } from './routes';
import Loading from './components/loading';
import { Auth } from './utils/user';
import { enableGuestMode } from './utils/authenticator/guest-mode';

import './utils/firebase';

const App = () => {
    const [ loaded, setLoaded ] = useState(false);

    if (localStorage.getItem('guest_mode') === '1') {
        enableGuestMode();
    }

    useEffect(() => {
        Auth.onAuthChange(() => {
            setLoaded(true);
        })
    });
    
    if (!loaded) {
        return <Loading/>;
    }

    return <Router>
        <React.Suspense fallback={<Loading/>}>
            <Switch>
                {pages}
            </Switch>
        </React.Suspense>
    </Router>;
}

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);