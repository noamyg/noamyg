import React, { Component } from 'react';
import './Header.css'
import Navigation from './Navigation';

class Header extends Component{
    // shouldComponentUpdate(nextProps, nextState){
    //     return false;
    // }
    render() {
        return (
            <div className="header">
                {this.props.children}
                {/* <CounterButton color={'red'} /> */}
                <div className="pb5 pt5">
                    <div className="f3">
                        <h1 className="mt0">Hi, I'm Noam.</h1>
                        <h2>FREELANCE TECH LEAD | FULLSTACK DEVELOPER | PROJECT MANAGER</h2>
                        <h3>But we can also talk about guitar stuff. Or cats. We should already have something in common.</h3>
                    </div>
                    <div className="social">
                        <a className="github" target="_blank" href="http://github.com/noamyg">Github</a>
                        <a className="linkedin" target="_blank" href="http://linkedin.com/in/noamyg">LinkedIn</a>
                        <a className="email" target="_blank" href="mailto:admin@noamyg.com">Email</a>
                        <a className="facebook" target="_blank" href="http://facebook.com/noamyg">Facebook</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;