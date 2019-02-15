import React from "react";
import { render } from "react-dom";

import TextDatepicker from "../../src/";

const Demo = () => (
  <div>
    <h1>react-text-datepicker Demo</h1>
    <TextDatepicker
      onChange={newValue => console.log("Date has changed: ", newValue)}
    />
  </div>
);

render(<Demo />, document.querySelector("#demo"));
