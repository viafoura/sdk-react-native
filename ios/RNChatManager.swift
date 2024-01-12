import Foundation

@objc(RNChatManager)
class RNChatManager : RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return RNChat()
  }
}
