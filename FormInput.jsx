import React from 'react';
import styles from "./FormInput.module.scss";

var $;
try {
  $ = require("jquery");
  require("jquery-datetimepicker/build/jquery.datetimepicker.min.css");
  require("jquery-datetimepicker/build/jquery.datetimepicker.full.min.js");
} catch(error) {
  $ = null;
}

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
        if(this._input_props.type === "datetime") {
          if($ === null) {
            console.warn(
              "jquery or datetimepicker not found, please install use \"npm i jquery jquery-datetimepicker\""
            );
            this._input_props.type = "text";
          } else {
            this._input_props.type = "date";
          }
        }
        this._input_ref = this.props.inputRef || React.createRef();
        this._inputKey = Math.random();
        this._spanKey = Math.random();
        this._divKey = Math.random();
    }

    componentDidMount() {
      if(this.props.type === "datetime") {
        if($ !== null) {
          $(this._input_ref.current).datetimepicker({
            startDate: new Date(),
            format: "Y-m-d\\T H:i:tP"
          });
        }
      }
    }

  render() {
    return (
      <div className={`input-group flex-nowrap ${this.props.className}`}>
        { this.props.title ?
          <div key={this._divKey} className="input-group-prepend">
            <span className="input-group-text">{ this.props.title }</span>
          </div>
          : ""}
        { (this.props.type === "textarea") ?
          <textarea
            { ...this._input_props }
            key={ this._inputKey }
            className={`form-control ${ styles.input }`}
            ref={ this._input_ref }
          />: <input
                { ...this._input_props }
                key={ this._inputKey }
                className={`form-control ${ styles.input }`}
                ref={ this._input_ref }
           />}
        <div className="input-group-append">
          { this.props.errorText ?
            <span key={this._spanKey} className="input-group-text">
              { this.props.errorText }
            </span> : "" }
        </div>
        { this.props.children ?
          <div className="input-group-append">
            { this.props.children }
          </div>
          : "" }
      </div>
    );
    }
}