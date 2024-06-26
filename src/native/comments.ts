var CommentsService = require('react-native').NativeModules.CommentsService;

export const commentCount = async (containerId: string) => {
  let commentCountValue = await CommentsService.commentCount(containerId);
  return commentCountValue;
};
