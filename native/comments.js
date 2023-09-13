var CommentsService = require('react-native').NativeModules.CommentsService;

export const commentCount = async (containerId) => {
  let commentCount = await CommentsService.commentCount(containerId);
  return commentCount;
};
