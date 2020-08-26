import React from "react";
import ReactDom from "react-dom";
import $ from "jquery";
import style from "./Alert.module.scss";
import bootstrap from "./bootstrap.module.scss";

function init_container() {
  let container = document.getElementById("alert_container");
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", "alert_container");
    container.className = style.alert_div;
    document.body.appendChild(container);
  }
  return container;
}

function generator(children, alert_level) {
  if (typeof children !== "string") {
    children = children.toString();
  }
  let container = init_container();
  let div = document.createElement("div");
  container.appendChild(div);
  ReactDom.render(
    <Alert
      onClose={() => {
        container.removeChild(div);
      }}
      alert_level={bootstrap["alert-warning"]}
    >
      {children}
    </Alert>,
    div
  );
}

export function alert(children) {
  generator(children, bootstrap["alert-warning"]);
}

export function info(children) {
  generator(children, bootstrap["alert-primary"]);
}

export function fatal(children) {
  generator(children, bootstrap["alert-danger"]);
}

class Alert extends React.Component {
  constructor(...args) {
    super(...args);
    this._alert_ref = React.createRef();
  }

  render() {
    return <div
      className={`${bootstrap["alert"]} ${this.props.alert_level} ${bootstrap["alert-dismissible"]} ${style.alert} ${bootstrap["fade"]} ${bootstrap["show"]}`}
      role="alert"
      ref={this._alert_ref}
    >
      {this.props.children}
      <button type="button"
        className={`${bootstrap["close"]} ${style.close} `}
        aria-label="Close" onClick={() => {
          $(this._alert_ref.current).alert("close");
          this.props.onClose && this.props.onClose();
        }}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>;
  }
}