import React, {useEffect, useRef} from 'react';
import {
  PixelRatio,
  UIManager,
  View,
  NativeModules,
  NativeEventEmitter,
  findNodeHandle,
} from 'react-native';

import isFunction from 'lodash.isfunction';

import {requireNativeComponent} from 'react-native';

const { RTEEventEmitter } = NativeModules;
// Connects the JS and Native event emitters over the RNBridge
const RTVEventEmitter = new NativeEventEmitter(RTEEventEmitter);

export const RNPreviewCommentsAndroid = requireNativeComponent('RNPreviewCommentsAndroid');

export default class RNPreviewCommentsAndroidComponent extends React.Component {
  nativeComponentRef;
  subscriptions = [];

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.remove());
    const androidViewId = findNodeHandle(this.nativeComponentRef);
    UIManager.dispatchViewManagerCommand(
      androidViewId,
      UIManager.RNPreviewCommentsAndroid.Commands.destroy.toString(),
      [androidViewId],
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.create();
    }, 2000);

    if (this.isValidCallback(this.props.onHeightChanged)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onHeightChanged', this.handleHeightChange),
      );
    }

    if (this.isValidCallback(this.props.onAuthNeeded)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onAuthNeeded', this.handleAuthNeeded),
      );
    }

    if (this.isValidCallback(this.props.onOpenProfile)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onOpenProfile', this.handleOpenProfile),
      );
    }

    if (this.isValidCallback(this.props.onNewComment)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onNewComment', this.handleNewComment),
      );
    }
  }

  create = () => {
    const androidViewId = findNodeHandle(this.nativeComponentRef);
    UIManager.dispatchViewManagerCommand(
      androidViewId,
      UIManager.RNPreviewCommentsAndroid.Commands.create.toString(),
      [androidViewId],
    );
  };

  isValidCallback = prop => prop && isFunction(prop);

  handleHeightChange = text => this.props.onHeightChanged(text);
  handleAuthNeeded = text => this.props.onAuthNeeded(text);
  handleOpenProfile = text => this.props.onOpenProfile(text);
  handleNewComment = text => this.props.onNewComment(text);

  render () {
    return (
      <RNPreviewCommentsAndroid
        ref={(nativeRef) => (this.nativeComponentRef = nativeRef)}
        {...this.props}
      />
    )
  }
};
