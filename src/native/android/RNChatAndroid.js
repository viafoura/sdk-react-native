import React from 'react';
import {
  UIManager,
  NativeModules,
  NativeEventEmitter,
  findNodeHandle,
} from 'react-native';

import isFunction from 'lodash.isfunction';

import { requireNativeComponent } from 'react-native';

const { RTEEventEmitter } = NativeModules;
// Connects the JS and Native event emitters over the RNBridge
const RTVEventEmitter = new NativeEventEmitter(RTEEventEmitter);

export const RNChatAndroid = requireNativeComponent('RNChatAndroid');

export default class RNChatComponentAndroid extends React.Component {
  nativeComponentRef;
  subscriptions = [];

  componentDidMount() {
    setTimeout(() => {
      this.create();
    }, 100);

    if (this.isValidCallback(this.props.onHeightChanged)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onHeightChanged', this.handleHeightChange)
      );
    }

    if (this.isValidCallback(this.props.onAuthNeeded)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onAuthNeeded', this.handleAuthNeeded)
      );
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
    const androidViewId = findNodeHandle(this.nativeComponentRef);
    UIManager.dispatchViewManagerCommand(
      androidViewId,
      UIManager.RNPreviewCommentsAndroid.Commands.destroy.toString(),
      [androidViewId]
    );
  }

  create = () => {
    const androidViewId = findNodeHandle(this.nativeComponentRef);
    UIManager.dispatchViewManagerCommand(
      androidViewId,
      UIManager.RNNewCommentAndroid.Commands.create.toString(),
      [androidViewId]
    );
  };

  isValidCallback = (prop) => prop && isFunction(prop);

  handleHeightChange = (text) => this.props.onHeightChanged(text);
  handleAuthNeeded = (text) => this.props.onAuthNeeded(text);

  render() {
    return (
      <RNChatAndroid
        ref={(nativeRef) => (this.nativeComponentRef = nativeRef)}
        {...this.props}
      />
    );
  }
}
