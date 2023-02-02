#import <React/RCTBridgeModule.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNPreviewCommentsManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(containerId, NSString)
RCT_EXPORT_VIEW_PROPERTY(onHeightChange, RCTBubblingEventBlock)

@end
