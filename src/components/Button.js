import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Button.css';

export default class Button extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  onPress = () => {
    if (this.props.control) {
      this.props.pickControl(this.props.control);
    } else if (this.props.operator) {
      this.props.pickOperator(this.props.operator);
    } else if ('undefined' !== typeof this.props.value) {
      this.props.pickValue(this.props.value);
    }
  };

  render () {
    return (
      <div className={classnames(styles.button, {
          [styles[`button_size_${this.props.size}`]]: styles[`button_size_${this.props.size}`],
          [styles.button_active]: this.props.active,
          [styles.button_control]: this.props.control,
          [styles.button_operator]: this.props.operator
        })}
        onClick={this.onPress}
        title={this.props.title}>
        {this.props.name}
      </div>
    );
  }
}
