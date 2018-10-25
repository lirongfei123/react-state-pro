import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './createStore';
class Com extends Component {
  static requireProps = {
    urlParam: PropTypes.string.isRequired
  }
  static typeError(props) {
    return <div>可选： 这里是自定义的内容，当必选参数不满足要求的时候，显示此内容，传入参数：{JSON.stringify(props)}</div>
  }
  render() {
    return (
      <div className="Com">
        {this.props.urlParam}
      </div>
    );
  }
}

export default connect((state)=>{
  return {
    urlParam: state.state1.urlParam,
  }
})(Com);
