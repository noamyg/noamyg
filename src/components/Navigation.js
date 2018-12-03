import React, { Component } from 'react';
import CustomerList from './CustomerList'

class Navigation extends Component{
    constructor(props){
		super(props);
    }

    navigate = (event) => {
        let component = CustomerList;
        this.props.navClick(component)
    }
    
    render(){
        // if (true) throw new Error('nooooo')
        return (
            <div className="topnav">
                <a className="home" href="/">NYG</a>
                <div className="fr">
                    <a className="f4 fw6 db white no-underline underline-hover pointer" onClick={this.navigate}>Portfolio</a>
                    <a className="f4 fw6 db white no-underline underline-hover pointer" onClick={this.navigate}>Customers</a>
                    <a className="f4 fw6 db white no-underline underline-hover pointer" onClick={this.navigate}>Good ol' CV</a>
                </div>
            </div>
        )
    }
} 

export default Navigation;