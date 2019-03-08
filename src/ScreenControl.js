import React, { Component } from 'react';
import DisplayController from './DisplayController';

class ScreenControl extends Component {
  render() {
    return (
      <div
        className="screenControl"
        style={{
          height: this.props.baseHeight,
          width: this.props.baseWidth,
        }}
      >
        <video src={this.props.vidSrc} />
        {this.props.displays.map(disp => (
          <DisplayController data={disp} key={disp.id} />
        ))}
      </div>
    );
  }
}

export default ScreenControl;
