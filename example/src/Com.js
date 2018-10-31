import React, { Component } from 'react'
import { connect } from './createStore'
class Com extends Component {
    add () {
        this.props.dispatch('state1/add')
    }
    reduce () {
        this.props.dispatch('state2/reduce')
    }
    render () {
        return (
            <div className="Com">
                comwerw
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state1: state.state1,
        state2: state.state2
    }
})(Com)
