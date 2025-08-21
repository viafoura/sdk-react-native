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

export const RNPreviewCommentsAndroid = requireNativeComponent(
  'RNPreviewCommentsAndroid'
);

export default class RNPreviewCommentsAndroidComponent extends React.Component {
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

    if (this.isValidCallback(this.props.onOpenProfile)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onOpenProfile', this.handleOpenProfile)
      );
    }

    if (this.isValidCallback(this.props.onNewComment)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onNewComment', this.handleNewComment)
      );
    }

    if (this.isValidCallback(this.props.onArticlePressed)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener(
          'onArticlePressed',
          this.handleArticlePressed
        )
      );
    }
  }

  create = () => {
    const androidViewId = findNodeHandle(this.nativeComponentRef);
    UIManager.dispatchViewManagerCommand(androidViewId, 'create', [
      androidViewId,
    ]);
  };

  isValidCallback = (prop) => prop && isFunction(prop);

  handleHeightChange = (text) => this.props.onHeightChanged(text);
  handleAuthNeeded = (text) => this.props.onAuthNeeded(text);
  handleOpenProfile = (text) => this.props.onOpenProfile(text);
  handleNewComment = (text) => this.props.onNewComment(text);
  handleArticlePressed = (text) => this.props.onArticlePressed(text);

  render() {
    return (
      <RNPreviewCommentsAndroid
        ref={(nativeRef) => (this.nativeComponentRef = nativeRef)}
        {...this.props}
      />
    );
  }
}
