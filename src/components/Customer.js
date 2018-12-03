import React, { Component } from 'react';

class Customer extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount() {
	}

	render(){
		return (
			<div className={`wow flipInX rubberBand fl w-100 w-third-ns pa2 grow bw3`}>
				<img style={{height: "75px"}} alt={this.props.customer.name} src={require(`../assets/images/logos/${this.props.customer.logo}`)}/>	
			</div>
		);
	}
}

export default Customer;