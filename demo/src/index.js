import React, { Component } from "react";
import { render } from "react-dom";

import ReactTextDatepicker from "../../src";

class Demo extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      date: new Date()
    };
  }

  onDateChange(newValue) {
    this.setState(() => {
      return { date: newValue };
    });
  }

  render() {
    return (
      <div>
        <h1>react-text-datepicker Demo</h1>
        <ReactTextDatepicker
          value={this.state.date}
          onChange={this.onDateChange}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
