import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import "bootswatch/dist/sketchy/bootstrap.min.css";
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';

// import bootswatch official themes
//import "bootswatch/dist/superhero/bootstrap.min.css";


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <ThemeSwitcher themePath="/themes" defaultTheme="superhero">
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </ThemeSwitcher>,
    rootElement);

registerServiceWorker();

