import React, { Component, Fragment } from 'react';
import './Layout.css';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
                <div className="layout-container">
                    <NavMenu />
                    {this.props.children}
                </div>
        );
    }
}
