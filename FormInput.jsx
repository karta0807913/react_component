import React from 'react';
import styles from "./FormInput.module.scss";
import bootstrap from "./bootstrap.module.scss";

let $ = null;
try {
  require("jquery-datetimepicker/build/jquery.datetimepicker.min.css");
  require("jquery-datetimepicker/build/jquery.datetimepicker.full.min.js");
  $ = require("jquery");
} catch (e) { }

export default class FormInput extends React.Component {
  constructor(...args) {
    super(...args);
    this._input_props = {
      ...this.props,
    };
    delete this._input_props.errorText;
    delete this._input_props.inputRef;
    delete this._input_props.title;
    delete this._input_props.className;
    delete this._input_props.children;
    if (this._input_props.type === "datetime" && $) {
      this._input_props.type = "text";
    }
    this._input_ref = this.props.inputRef || React.createRef();
    this._inputKey = Math.random();
    this._spanKey = Math.random();
    this._divKey = Math.random();
  }

  componentDidMount() {
    if (this.props.type === "datetime" && $) {
      $(this._input_ref.current).datetimepicker({
        startDate: new Date(),
        format: "Y-m-d\\T H:i:tP"
      });
    }
  }

  value() {
    return this._input_ref.current.value;
  }

  render() {
    return (
      <div className={`${bootstrap["input-group"]} ${bootstrap["flex-nowrap"]} ${this.props.className || ""}`}>
        {this.props.title ?
          <div key={this._divKey} className={bootstrap["input-group-prepend"]}>
            <span className={bootstrap["input-group-text"]}>{this.props.title}</span>
          </div>
          : ""}
        {(this.props.type === "textarea") ?
          <textarea
            {...this._input_props}
            key={this._inputKey}
            className={`${bootstrap["form-control"]} ${styles.input}`}
            ref={this._input_ref}
          /> : <input
            {...this._input_props}
            key={this._inputKey}
            className={`${bootstrap["form-control"]} ${styles.input}`}
            ref={this._input_ref}
          />}
        <div className={bootstrap["input-group-append"]}>
          {this.props.errorText ?
            <span key={this._spanKey} className={bootstrap["input-group-text"]}>
              {this.props.errorText}
            </span> : ""}
        </div>
        {
          this.props.children ?
            <div className={bootstrap["input-group-append"]}>
              {this.props.children}
            </div>
            : ""
        }
      </div >
    );
  }
}
