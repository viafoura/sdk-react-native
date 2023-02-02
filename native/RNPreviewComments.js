import React from 'react';
import {
  requireNativeComponent,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import isFunction from 'lodash.isfunction';

const { RTEEventEmitter } = NativeModules;
// Connects the JS and Native event emitters over the RNBridge
const RTVEventEmitter = new NativeEventEmitter(RTEEventEmitter);
const RNPreviewComments = requireNativeComponent('RNPreviewComments');

// This component is all about abstracting away the native module interface
// and allowing downstream users to use the simple `onXYZ` hooks in the props
export default class RNPreviewCommentsComponent extends React.Component {
  subscriptions = [];

  componentDidMount() {
    // Only add the listener if the associated prop is a callback function
    if (this.isValidCallback(this.props.onHeightChanged)) {
      this.subscriptions.push(
        // This is when the `startObserving` function is called on the native side
        // if this is the first component using `RTEEventEmitter` that mounted
        RTVEventEmitter.addListener('onHeightChanged', this.handleHeightChange),
      );
    }

    if (this.isValidCallback(this.props.onAuthNeeded)) {
      this.subscriptions.push(
        // This is when the `startObserving` function is called on the native side
        // if this is the first component using `RTEEventEmitter` that mounted
        RTVEventEmitter.addListener('onAuthNeeded', this.handleAuthNeeded),
      );
    }
  }

  // Check that a prop exists and is a function
  isValidCallback = prop => prop && isFunction(prop);

  handleHeightChange = text => this.props.onHeightChanged(text);
  handleAuthNeeded = text => this.props.onAuthNeeded(text);

  // Remove all listeners when the component is unmounted
  // This is when the `stopObserving` function is called on the native side
  // if this is the last component using `RTEEventEmitter` that unmounted
  componentWillUnmount = () => this.subscriptions.forEach(sub => sub.remove());

  render() {
    return <RNPreviewComments {...this.props} />;
  }
}
