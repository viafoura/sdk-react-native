import React from 'react';
import {
  requireNativeComponent,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import isFunction from 'lodash.isfunction';

const { RTEEventEmitter } = NativeModules;

const RTVEventEmitter = new NativeEventEmitter(RTEEventEmitter);
const RNPreviewComments = requireNativeComponent('RNPreviewComments');

export default class RNPreviewCommentsiOSComponent extends React.Component {
  subscriptions = [];

  componentDidMount() {
    if (this.isValidCallback(this.props.onHeightChanged)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onHeightChanged', this.handleHeightChange)
      );
    }

    if (this.isValidCallback(this.props.onArticlePressed)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onArticlePressed', this.handleArticlePressed)
      );
    }

    if (this.isValidCallback(this.props.onAuthNeeded)) {
      this.subscriptions.push(
        RTVEventEmitter.addListener('onAuthNeeded', this.handleAuthNeeded)
      );
    }
  }

  isValidCallback = (prop) => prop && isFunction(prop);

  handleHeightChange = (text) => this.props.onHeightChanged(text);
  handleAuthNeeded = (text) => this.props.onAuthNeeded(text);
  handleArticlePressed = (text) => this.props.onArticlePressed(text);

  componentWillUnmount = () =>
    this.subscriptions.forEach((sub) => sub.remove());

  render() {
    return <RNPreviewComments {...this.props} />;
  }
}
