import React from "react";

import style from "./Tab.module.scss";


export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    this._children_info = [];
    this._current_index = this.props.default || 0;
    this._children = [];
    React.Children.forEach(this.props.children, (child, index) => {
      let ref = React.createRef();
      this._children.push(
        <div key={index} className={style.hide} ref={ref}>
          {child}
        </div>
      );
      this._children_info.push({
        ref,
        button_ref: React.createRef(),
        title: child.props.title
      });
    });
  }

  componentDidMount() {
    if (this._children.length !== 0) {
      this._change(0);
    }
  }

  _tab_list() {
    let button_list = [];
    for (let index in this._children_info) {
      let child_info = this._children_info[index];
      button_list.push(
        <li key={index + 1} ref={child_info.button_ref} onClick={() => this._onChange(index)}>
          {child_info.title}
        </li>
      );
    }
    return button_list;
  }

  _set_activate(info) {
    info.ref.current.classList.remove(style.hide);
    info.button_ref.current.classList.add(style.active);
  }

  _set_inavtive(info) {
    info.ref.current.classList.add(style.hide);
    info.button_ref.current.classList.remove(style.active);
  }

  _change(index) {
    this._set_inavtive(this._children_info[this._current_index]);
    this._set_activate(this._children_info[index]);
    this._current_index = index;
  }

  _onChange(index) {
    this.props.beforeChange && this.props.beforeChange(index);
    this._change(index);
    this.props.afterChange && this.props.afterChange(index);
  }

  render() {
    return (
      <div className={`${style.context} ${this.props.className || ""}`} ref={this.props.innerRef}>
        <ul>
          {this._tab_list()}
        </ul>
        <div>
          {this._children}
        </div>
      </div>
    );
  }
}