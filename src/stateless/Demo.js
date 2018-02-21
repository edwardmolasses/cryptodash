import React, { Component } from 'react';

class StackCallBox extends Component {
    render() {
        return (
          <div className="stack-call-box list-item-border-color p5 color-black flex flex-dr">
            <div className="w40">{this.props.index}</div>
            <div className="w300">{this.props.module}</div>
            <div>{this.props.location}</div>
          </div>
        )
    }
}

export default StackCallBox;
