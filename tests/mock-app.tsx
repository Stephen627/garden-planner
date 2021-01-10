import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import mockStore from './mock-store';

const MockApp = (props: any) => <Provider store={mockStore}><Router>{props.children}</Router></Provider>

export default MockApp;
