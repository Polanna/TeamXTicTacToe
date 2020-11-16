import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';

import { NewGame } from './components/NewGame';
import { Settings } from './components/Settings';
import { FAQPage } from './components/FAQPage';
import { BoardPage } from './components/BoardPage';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Fragment>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/new-game' component={NewGame} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/faq' component={FAQPage} />
                    <Route path='/boardpage' component={BoardPage} />
                </Layout>
            </Fragment>
        );
    }
}
