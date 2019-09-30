import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/newlogin'
import Register from './pages/Register'
import Feed from './pages/Feed'

import Modal from 'react-modal';
import { BrowserRouter as Router, Route} from 'react-router-dom';

Modal.setAppElement('#root')

const routing = (
    <Router>
        <div>
            < Route path = "/login" component = { Login } />
            < Route path = "/about" component = { About } />
            < Route path = "/home" component = { () => <Home /> } />
            < Route path = "/register" component = { Register } />
            < Route path = "/feed" component = { Feed } />
        </div>
    </Router>
   )
   ReactDOM.render(routing,document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
