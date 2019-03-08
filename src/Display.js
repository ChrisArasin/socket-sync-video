import React, { Component } from 'react';

// displayPos={this.state.displayPos}
// displaySize
// displayAspectRatio={this.state.displayAspectRatio}
// baseHeight={baseHeight}
// baseWidth={baseWidth}

class Display extends Component {
  componentDidMount() {
    this.displayWidth = window.innerWidth;
  }
  render() {
    const screenToBase = this.displayWidth / this.props.baseWidth;
    const displayToBase = this.props.baseWidth / this.props.displaySize.width;
    const scale = screenToBase * displayToBase;

    // const y = ((-1 * this.props.displayPos.y) / this.props.baseHeight) * scale *
    const x =
      ((-1 * this.props.displayPos.x) / this.props.baseWidth) *
      scale *
      this.props.baseWidth;

    const y =
      ((-1 * this.props.displayPos.y) / this.props.baseHeight) *
      scale *
      this.props.baseHeight;

    return (
      <div className="display">
        <video
          src={this.props.vidSrc}
          style={{
            width: this.props.baseWidth,
            height: this.props.baseHeight,
            transform: `translate(${x}px, ${y}px) scale(${scale}) `,
          }}
          muted
          autoPlay
          loop
          playsInline
        />
      </div>
    );
  }
}

export default Display;
