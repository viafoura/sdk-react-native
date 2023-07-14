#import <React/RCTBridgeModule.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNPreviewCommentsManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(containerId, NSString)
RCT_EXPORT_VIEW_PROPERTY(authorId, NSString)
RCT_EXPORT_VIEW_PROPERTY(articleTitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(articleSubtitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(articleUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(articleThumbnailUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(darkMode, BOOL)

@end
