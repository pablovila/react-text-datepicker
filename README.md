# react-text-datepicker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Sometimes you don't want a calendar datepicker for your forms. Everybody knows his/her own birthday or other important dates that they can enter using old-fashion keyboard. This package helps you with this.

![react-text-datepicker example](https://raw.githubusercontent.com/pablovila/react-text-datepicker/master/src/react-text-datepicker.png)

[build-badge]: https://img.shields.io/travis/pablovila/react-text-datepicker/master.png?style=flat-square
[build]: https://travis-ci.org/pablovila/react-text-datepicker
[npm-badge]: https://img.shields.io/npm/v/react-text-datepicker.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-text-datepicker
[coveralls-badge]: https://img.shields.io/coveralls/pablovila/react-text-datepicker/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/pablovila/react-text-datepicker

## Installation

Install it from npm and include it in your React build process (using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), etc).

```bash
npm install --save react-text-datepicker
```

or:

```bash
yarn add react-text-datepicker
```

## Usage

```javascript static
import React from "react";
import TextDatepicker from "react-text-datepicker";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDate: new Date()
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.setState({
      myDate: newValue
    });
  }

  render() {
    return (
      <TextDatepicker value={this.state.myDate} onChange={this.onChange} />
    );
  }
}
```

## Props

Common props you may want to specify include:

| prop        | Description                                               | Default Value |
| ----------- | --------------------------------------------------------- | ------------- |
| `dayHint`   | change the text displayed as placeholder for day input    | `DD`          |
| `hints`     | specify if you want to display placeholder for each input | `true`        |
| `monthHint` | change the text displayed as placeholder for month input  | `MM`          |
| `onChange`  | subscribe to change events                                | `null`        |
| `separator` | change the text displayed between parts of date           | `/`           |
| `value`     | control the current value                                 | `null`        |
| `yearHint`  | change the text displayed as placeholder for year input   | `YYYY`        |

## License

MIT
