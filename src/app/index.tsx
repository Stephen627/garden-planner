import * as React from 'react';
import * as ReactDOM from 'react-dom';;
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { pages } from './routes';
import Loading from './pages/loading';

import './utils/firebase';

ReactDOM.render(
    <React.Suspense fallback={Loading}>
        <Router>
            <Switch>
                {pages}
            </Switch>
        </Router>
    </React.Suspense>,
    document.getElementById('app')
);