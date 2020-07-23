import React from 'react';
import $ from "jquery";

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this._modal = React.createRef();
    this._onSubmit = this.props.onSubmit || function() {};
  }

  show() {
    $(this._modal.current).modal("show");
  }

  hide() {
    $(this._modal.current).modal("hide");
  }

  cancel_button() {
    if(this.props.cancel) {
      return (
        <button
          type="button"
          onClick={ this.hide.bind(this) }
          className="btn btn-secondary"
        >
          { this.props.cancel }
        </button>
      );
    }
    return "";
  }

  confirm_button() {
    if(this.props.confirm) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={ this._onSubmit }
        >
          { this.props.confirm }
        </button>
      );
    }
    return "";
  }

  render() {
    return (
      <div
        className="modal fade"
        ref={this._modal}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ this.props.title }</h5>
              <button
                type="button"
                onClick={ this.hide.bind(this) }
                className="close" aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { this.props.children }
            </div>
            <div className="modal-footer">
              { this.cancel_button() }
              { this.confirm_button() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}