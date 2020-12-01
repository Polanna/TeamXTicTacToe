import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { TokenChoice } from './TokenChoice';
import { ThemeSettings } from './ThemeSettings';


export class Settings extends Component {
    static displayName = Settings.name;

    state = {
        activeTab: 'X'
    }

    render() {
        console.log("token x = " + this.props.tokenX);
        return (
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 'X' ? "active":""}
                            onClick={() => this.setState({ activeTab: 'X' })}
                        >
                            X Token
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 'O' ? "active" : ""}
                            onClick={() => this.setState({ activeTab: 'O' })}
                        >
                            O Token
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 'Theme' ? "active" : ""}
                            onClick={() => this.setState({ activeTab: 'Theme' })}
                        >
                            Theme
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="X">
                        <TokenChoice token={this.props.tokenX} setToken={this.props.setTokenX} tokenDisable={this.props.tokenO}/>
                    </TabPane>
                    <TabPane tabId="O">
                        <TokenChoice token={this.props.tokenO} setToken={this.props.setTokenO} tokenDisable={this.props.tokenX}/>
                    </TabPane>
                    <TabPane tabId="Theme">
                        <ThemeSettings/>
                    </TabPane>
                </TabContent>
                <div className="row align-items-center h-50 ">
                    <div className="col-md-12 text-center mt-4">
                        <Link to='/'>
                            <button type="button" className="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Done</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}