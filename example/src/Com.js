import React, { Component } from 'react'
import PropChecks from 'prop-checks'
import { connect } from './createStore'
class Com extends Component {
    add () {
        this.props.dispatch('state1/add')
    }
    reduce () {
        console.log('2342')
        const result = this.props.dispatch('state2/reduce')
        console.log(result)
    }
    static requireProps = {
        taskId1: PropChecks.object.isRequired
    }
    static autoActions = [
        {
            name: 'state1/add',
            params: {
                taskId: '{taskId1}',
                taskId2: '{taskId2}'
            }
        }
    ]
    render () {
        return (
            <div className="Com">
                comwerqwqwqw
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
