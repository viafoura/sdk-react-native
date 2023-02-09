import RNNewCommentAndroidComponent from '../native/android/RNNewCommentAndroid.js';

const NewCommentScreen = ({navigation, route}) => {
  return <RNNewCommentAndroidComponent
  style= {{ height: this.state.commentsHeight }}
  containerId={route.params.containerId}
  articleTitle={route.params.articleTitle}
  articleSubtitle={route.params.articleDesc}
  articleUrl={route.params.articleUrl}
  articleThumbnailUrl={route.params.articleThumbnailUrl}
  newCommentActionType={route.params.newCommentActionType}
  content={route.params.content}
  onHeightChanged = {(event: any) => {
    this.state.commentsHeight = event.newHeight;
  }}
  onCloseNewComment = {(event: any) => {
    navigation.goBack();
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>

  </RNNewCommentAndroidComponent>
};


export default NewCommentScreen;
