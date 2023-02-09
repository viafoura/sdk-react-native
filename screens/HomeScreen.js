import RNPreviewCommentsiOSComponent from '../native/ios/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from '../native/android/RNPreviewCommentsAndroid.js';

const PreviewComments = Platform.select({
  ios: RNPreviewCommentsiOSComponent,
  android: RNPreviewCommentsAndroidComponent
});

const HomeScreen = ({navigation, route}) => {
  return <PreviewComments
  style= {{ height: 1000 }}
  containerId={route.params.containerId}
  articleTitle={route.params.articleTitle}
  articleSubtitle={route.params.articleDesc}
  articleUrl={route.params.articleUrl}
  articleThumbnailUrl={route.params.articleThumbnailUrl}
  onHeightChanged = {(event: any) => {
    this.state.commentsHeight = event.newHeight;
  }}
  onOpenProfile = {(event: any) => {
    var object = {
      userUUID: event.userUUID,
      presentationType: event.presentationType ?? "profile"
    };
    navigation.navigate('Profile', object)
  }}
  onNewComment = {(event: any) => {
    var object = {
      containerId: route.params.containerId,
      articleTitle: route.params.articleTitle,
      articleDesc: route.params.articleDesc,
      articleUrl: route.params.articleUrl,
      articleThumbnailUrl: route.params.articleThumbnailUrl,
      newCommentActionType: event.actionType,
      content: event.content
    };
    navigation.navigate('NewComment', object)
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>
  </PreviewComments>
};


export default HomeScreen;
