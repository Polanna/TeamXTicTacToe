import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';

import { NewGame } from './components/NewGame';
import { Settings } from './components/Settings';
import { FAQPage } from './components/FAQPage';
import { BoardPage } from './components/BoardPage';
import { OnlineBoardPage } from './components/OnlineBoardPage';
import { TutorialPage } from './components/TutorialPage';
import { OnePlayerPage } from './components/OnePlayerPage';
import { About } from './components/About';

export default class App extends Component {
    static displayName = App.name;

    state = {
        tokenX: 'fox',
        tokenO: 'chick'
    };

    setTokenX = (token) => {
        console.log("Set token x to " + token);
        this.setState({ tokenX: token });
    };

    setTokenO = (token) => {
        console.log("Set token o to " + token);
        this.setState({ tokenO: token });
    };

    render() {
        return (
            <Fragment>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/new-game' component={NewGame} />
                    <Route path='/settings' render={() => (
                        <Settings tokenX={this.state.tokenX} tokenO={this.state.tokenO} setTokenX={this.setTokenX} setTokenO={this.setTokenO} />
                    )} />
                    <Route path='/faq' component={FAQPage} />
                    <Route path='/boardpage' render={() => (
                        <BoardPage tokenX={this.state.tokenX} tokenO={this.state.tokenO} />
                    )} />
                    <Route path='/tutorialpage' render={() => (
                        <TutorialPage tokenX={this.state.tokenX} tokenO={this.state.tokenO} />
                    )} />
                    <Route path='/about' component={About} />
                    <Route path='/oneplayerpage' render={() => (
                        <OnePlayerPage tokenX={this.state.tokenX} tokenO={this.state.tokenO} />
                    )} />
                    <Route path='/onlinepage' render={() => (
                        <OnlineBoardPage tokenX={this.state.tokenX} tokenO={this.state.tokenO} />
                    )} />
                </Layout>
            </Fragment>
        );
    }
}
