import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this._form = React.createRef();
  }

  valid() {
    return this._form.current.checkValidity();
  }

  raw() {
    let data = new FormData(this._form.current);
    let result = {};
    data.forEach((val, key) => {
      result[key] = val;
    });
    return result;
  }

  json() {
    return JSON.stringify(this.raw());
  }

  render() {
    return (
      <form ref={this._form} {...this.props}>
      </form>
    );
  }
}