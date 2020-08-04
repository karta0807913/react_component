import React from 'react';
import styles from "./FeatherButton.module.scss";

import * as feather from "feather-icons";

export default class FeatherButton extends React.Component {
  render() {
    return (
      <div className={`${styles.container} ${this.props.className || ""}`} onClick={ this.props.onClick } >
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
