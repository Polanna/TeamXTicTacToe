import React, { Component, Fragment } from 'react';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


export class ThemeSettings extends Component {
    static displayName = ThemeSettings.name;

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('cerulean')}>
                            <img className='themePiece' src='./themes/cerulean/thumbnail.png' alt='cerulean' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('pulse')}>
                            <img className='themePiece' src='./themes/pulse/thumbnail.png' alt='pulse' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('minty')}>
                            <img className='themePiece' src='./themes/minty/thumbnail.png' alt='minty' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('darkly')}>
                            <img className='themePiece' src='./themes/darkly/thumbnail.png' alt='darkly' />
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('superhero')}>
                            <img className='themePiece' src='./themes/superhero/thumbnail.png' alt='superhero' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('sketchy')}>
                            <img className='themePiece' src='./themes/sketchy/thumbnail.png' alt='sketchy' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('united')}>
                            <img className='themePiece' src='./themes/united/thumbnail.png' alt='united' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('litera')}>
                            <img className='themePiece' src='./themes/litera/thumbnail.png' alt='litera' />
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('simplex')}>
                            <img className='themePiece' src='./themes/simplex/thumbnail.png' alt='simplex' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('slate')}>
                            <img className='themePiece' src='./themes/slate/thumbnail.png' alt='slate' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('solar')}>
                            <img className='themePiece' src='./themes/solar/thumbnail.png' alt='solar' />
                        </Button>
                    </div>
                    <div className="col-md-3">
                        <Button type='button' outline active={this.props.theme === 'cerulean'} onClick={() => this.context.themeSwitcher.load('spacelab')}>
                            <img className='themePiece' src='./themes/spacelab/thumbnail.png' alt='spacelab' />
                        </Button>
                    </div>
                </div>

            </Fragment>
        );
    }
}

ThemeSettings.contextTypes = {
    themeSwitcher: PropTypes.object
};

