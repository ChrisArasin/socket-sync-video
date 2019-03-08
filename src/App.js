import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import Display from './Display';
import ScreenControl from './ScreenControl';
import { subscribeDisplay, subscribeController, sendSync } from './api';

import './App.css';
import vidSrc from './sun-test.mp4';

const DISPLAY = 'display';
const CONTROLLER = 'controller';
const vidAr = 0.563;

const baseHeight = 600;
const baseWidth = vidAr * 600;

class App extends Component {
  state = {
    isSubscribed: false,
    type: null,
    // is controller
    displays: [],
    // is display
    displayPos: {},
    displaySize: {
      width: 1,
      height: 1,
    },
    displayAspectRatio: {},
    displayId: null,
  };

  handleNewDisplay = data => {
    console.log('new display', data);
    this.setState({
      displays: [...this.state.displays, data],
    });
  };

  subscribeController = () => {
    this.setState({
      isSubscribed: true,
      type: CONTROLLER,
    });
    subscribeController(this.handleNewDisplay);
  };

  createDisplayData = () => {
    return {
      id: uuidv1(),
      aspectRatio: window.innerWidth / window.innerHeight,
      pos: { x: 10, y: 10 },
    };
  };

  // what a display does when it gets a display has been updated message
  displayUpdatedCb = data => {
    if (data.id === this.state.displayId) {
      // handle display update.
      console.log('ive been updated', data);
      this.setState({
        displaySize: {
          width: data.width,
          height: data.height,
        },
        displayPos: {
          x: data.x,
          y: data.y,
        },
      });
    }
  };
  initSync = () => {
    sendSync();
  };
  restartCb = () => {
    const video = document.querySelector('video');
    video.pause();
    video.currentTime = 0;
    video.play();
  };
  subscribeDisplay = () => {
    this.setState({
      isSubscribed: true,
      type: DISPLAY,
    });
    const displayData = this.createDisplayData(this.displayUpdatedCb);
    this.setState({
      displayId: displayData.id,
    });
    subscribeDisplay(displayData, this.displayUpdatedCb, this.restartCb);
  };

  render() {
    if (!this.state.isSubscribed) {
      return (
        <div className="App">
          <button onClick={this.subscribeController}>
            Subscribe as Controller
          </button>
          <br />
          <button onClick={this.subscribeDisplay}>Subscribe as Display</button>
        </div>
      );
    }

    if (this.state.type === CONTROLLER) {
      return (
        <div>
          <ScreenControl
            displays={this.state.displays}
            vidAr={vidAr}
            vidSrc={vidSrc}
            baseHeight={baseHeight}
            baseWidth={baseWidth}
          />
          <button onClick={this.initSync}>Sync Video</button>
        </div>
      );
    } else if (this.state.type === DISPLAY) {
      return (
        <Display
          vidSrc={vidSrc}
          displayPos={this.state.displayPos}
          displaySize={this.state.displaySize}
          displayAspectRatio={this.state.displayAspectRatio}
          baseHeight={baseHeight}
          baseWidth={baseWidth}
        />
      );
    }

    return <div className="App">something is wrong</div>;
  }
}

export default App;
