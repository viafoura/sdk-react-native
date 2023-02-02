import Foundation

@objc(RNPreviewCommentsManager)
class RNPreviewCommentsManager : RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return RNPreviewComments()
  }
}
