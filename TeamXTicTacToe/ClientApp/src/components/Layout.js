import React, { Component } from 'react';
import './Layout.css';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="layout-container">
                {this.props.children}
            </div>
        );
    }
}
