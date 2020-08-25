import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';;
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { pages } from './routes';
import Loading from './pages/loading';
import { Auth } from './utils/user';

import './utils/firebase';

const App = () => {
    const [ loaded, setLoaded ] = useState(false);
    useEffect(() => {
        Auth.onAuthChange(() => {
            setLoaded(true);
        })
    });
    
    if (!loaded) {
        return <Loading/>;
    }

    return <React.Suspense fallback={Loading}>
        <Router>
            <Switch>
                {pages}
            </Switch>
        </Router>
    </React.Suspense>;
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);