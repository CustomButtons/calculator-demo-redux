import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Display.css';

export default class Display extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    memoryEnabled: PropTypes.bool.isRequired,
    memoryIsEmpty: PropTypes.bool.isRequired
  };

  componentWillMount() {
    this.transformValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.transformValue(nextProps.value);
    }
  }

  transformValue = (value) => {
    let transformedValue = value.replace(/^\./, '0.');
    transformedValue = isFinite(transformedValue) ? transformedValue.replace('.', ',').replace(/e\+/, 'E').replace(/[0-9,]{17,}E/, _ => `${_.slice(0, 16)}E`) : 'Not a number';
    const fontSize = (transformedValue.length < 8) ? `` : `${Math.max((4.8 * 8 / ( 1.12 * (transformedValue.length || 1) )), 1)}rem`;
    this.setState({
      transformedValue,
      fontSize
    });
  };

  render () {
    return (
      <div
        className={classnames(styles.display)}>
        <div className={classnames(styles.toggle)}>
          <div className={classnames(styles.toggle__button, styles.toggle__button_red)} onClick={this.props.actions.toggleMemory} title="Toggle memory"></div>
          <div className={classnames(styles.toggle__button, styles.toggle__button_yellow)} title="Not implemented"></div>
          <div className={classnames(styles.toggle__button, styles.toggle__button_green)} title="Not implemented"></div>
        </div>
        <div className={classnames('memory', styles.memory, {[styles.memory_active]: this.props.memoryEnabled && !this.props.memoryIsEmpty})}>M</div>
        <div className={classnames('value', styles.value)} style={{"fontSize": this.state.fontSize}}>
          {this.state.transformedValue}
        </div>
      </div>
    );
  }
}
