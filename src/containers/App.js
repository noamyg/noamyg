import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import CustomerList from '../components/CustomerList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'
import { setTargetComponent, setSearchField, requestCustomers } from '../actions'
import WOW from 'wowjs';
import '../../node_modules/animate.css/animate.css'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		customers: state.requestCustomers.customers,
		isPending: state.requestCustomers.isPending,
		error: state.requestCustomers.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onNavClick: component => {
			debugger;
			dispatch(setTargetComponent(component))
		},
		onRequestCustomers: () => dispatch(requestCustomers())
	}
}

class App extends Component {
	
	componentDidMount(){
		this.props.onRequestCustomers();
		new WOW.WOW({
			live: false
		}).init();
	}

	render(){
		const { customers, searchField, onSearchChange, onNavClick, isPending } = this.props;
		return (
				<div className="tc">
					<Header>
                		<Navigation navClick={onNavClick}/>
					</Header>
					{/* <SearchBox searchChange={onSearchChange}/> */}
					{isPending ? <h1>Loading....</h1> : ''}
					{/* <Scroll> */}
						<ErrorBoundry>
							<CustomerList customers={customers}/>
						</ErrorBoundry>	
					{/* </Scroll> */}
				</div>
			)	
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);