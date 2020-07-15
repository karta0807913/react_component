import React from 'react';
import styles from "./FeatherButton.module.scss";

import * as feather from "feather-icons";

export default class FeatherButton extends React.Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    return (
      <div className={`${styles.product_coin_div} ${this.props.className || ""}`} onClick={ this.props.onClick } >
        <div dangerouslySetInnerHTML={{ __html: feather.icons[this.props.Icon].toSvg() }}/>
        <div>
          <span>
            { this.props.Name }
          </span>
        </div>
      </div>
    );
  }
}