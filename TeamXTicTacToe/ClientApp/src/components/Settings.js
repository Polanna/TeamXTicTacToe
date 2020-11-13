import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class Settings extends Component {
    static displayName = Settings.name;
    render() {
        return (
            <div class="row align-items-center h-50 ">
                <div class="col-md-12 text-center mt-4">
                    <Link to='/'>
                        <button type="button" class="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Done</button>
                    </Link>
                </div>
            </div>
        );
    }
}