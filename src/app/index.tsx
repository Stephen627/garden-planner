import * as React from 'react';
import * as ReactDOM from 'react-dom';;
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { pages } from './routes';

import './utils/firebase';

ReactDOM.render(
    <Router>
        <Switch>
            {pages}
        </Switch>
    </Router>,
    document.getElementById('app')
);