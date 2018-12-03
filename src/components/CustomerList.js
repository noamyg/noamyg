import React, { Component } from 'react';
import Customer from './Customer';

class CustomerList extends Component {
    constructor(props) {
		super(props);
        this.myRef = React.createRef();
	}
	
	render(){
		return (
			<div ref={this.myRef} className="mw9 center ph3-ns">
				<div className="cf ph2-ns">
					{this.props.customers.map((customer, i) => {
						return <Customer key={i} customer={customer}/>
						})
					}
				</div>
			</div>
		)
	}
}

// const CustomerList = ({customers}) => {
// 	// if (true) throw new Error('nooooo')
// 	return (
// 		<div className="mw9 center ph3-ns">
// 			<div className="cf ph2-ns">
// 				{customers.map((customer, i) => {
// 					return <Customer key={i} customer={customer}/>
// 					})
// 				}
// 			</div>
// 		</div>
// 	)
// }

export default CustomerList;
