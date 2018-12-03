import React, { PureComponent } from 'react'

class CounterButton extends PureComponent{
    constructor(){
        super();
        this.state = {
            count : 0
        }
    }
    
    updateCount = () => {
        this.setState(state => {
            return {count: this.state.count + 1}
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.state.count !== nextState.count 
    }
    render() {
        return (
            <button color={this.props.color} onClick={this.updateCount}>
                Count: {this.state.count}
            </button>    
        )
    }

}

export default CounterButton;