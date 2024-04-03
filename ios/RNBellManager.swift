import Foundation
import ViafouraSDK

@objc(RNBellManager)
class RNBellManager : RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
    
  override func view() -> UIView! {
    return RNBell()
  }
}
