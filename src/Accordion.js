import React, { Component } from 'react';

class Accordion extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        class: 'accordion-closed'
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      if (this.state.open) {
        this.setState({
          open: false,
          class: "accordion-closed"
        });
      } else {
        this.setState({
          open: true,
          class: "accordion-open"
        });
      }
    }

    render() {
        return (
          <div className={`accordion ${this.state.class} posr`}>
            <div className="cursor-pointer" onClick={this.handleClick}>
              <div className="no-select">
                {this.props.title}
              </div>
              <div className="accordion-caret posa r10 t0">
                ^
              </div>
            </div>
            <div className="accordion-content">{this.props.content}</div>
          </div>
        )
    }
}

export default Accordion;
