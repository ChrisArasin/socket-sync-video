import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { updateDisplay } from './api';

class DisplayController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.data.pos.x,
      y: this.props.data.pos.y,
      width: this.props.data.aspectRatio * 100 + 'px',
      height: 100 + 'px',
    };
  }
  componentDidUpdate() {
    console.log('update display');
    updateDisplay({
      id: this.props.data.id,
      x: this.state.x,
      y: this.state.y,
      width: parseInt(this.state.width.replace('px', ''), 10),
      height: parseInt(this.state.height.replace('px', ''), 10),
    });
  }
  render() {
    return (
      <Rnd
        lockAspectRatio={true}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      />
    );
  }
}

export default DisplayController;
