import Foundation
import AVFoundation
import ViafouraSDK

class RNPreviewComments: UIView, VFLoginDelegate {
  weak var previewCommentsViewController: VFPreviewCommentsViewController?

  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  required init?(coder aDecoder: NSCoder) { fatalError("nope") }

  var containerId = ""
  var settings: VFSettings?
  var articleMetadata: VFArticleMetadata?

  override func layoutSubviews() {
    super.layoutSubviews()

    if previewCommentsViewController == nil {
      let colors = VFColors(colorPrimary: UIColor(red: 0.00, green: 0.45, blue: 0.91, alpha: 1.00), colorPrimaryLight: UIColor(red: 0.90, green: 0.95, blue: 1.00, alpha: 1.00), colorBackground: VFColors.colorBackgroundDefault, colorSeparator: VFColors.colorSeparatorDefault)
      let fonts = VFFonts(fontLight: UIFont.boldSystemFont(ofSize: 1), fontRegular: UIFont.boldSystemFont(ofSize: 1), fontMedium: UIFont.boldSystemFont(ofSize: 1), fontSemibold: UIFont.boldSystemFont(ofSize: 1), fontBold: UIFont.boldSystemFont(ofSize: 1))
      settings = VFSettings(colors: colors, fonts: fonts)
      articleMetadata = VFArticleMetadata(
        url: URL(string: "https://test.com")!, title: "Test", subtitle: "Subtitle",
        thumbnailUrl: URL(string: "https://test.com")!)
      
      embed()
    } else {
      previewCommentsViewController?.view.frame = bounds
    }
  }

  private func embed() {
    ViafouraSDK.initialize(siteUUID: "00000000-0000-4000-8000-c8cddfd7b365", siteDomain: "viafoura-mobile-demo.vercel.app")

    guard let parentVC = parentViewController, let settings = settings, let articleMetadata = articleMetadata else {
      return
    }

    guard let vc = VFPreviewCommentsViewController.new(
        containerId: containerId, articleMetadata: articleMetadata, loginDelegate: self,
        settings: settings) else {
      return
    }
    
    let callbacks: VFActionsCallbacks = { type in
        switch type {
        case .writeNewCommentPressed(let actionType):
            self.presentNewCommentViewController(actionType: actionType)
        case .seeMoreCommentsPressed:
            break
        case .openProfilePressed(let userUUID, let presentationType):
            self.presentProfileViewController(userUUID: userUUID, presentationType: presentationType)
        default:
            break
        }
    }
    
    
    vc.setActionCallbacks(callbacks: callbacks)
    parentVC.addChild(vc)
    addSubview(vc.view)
    vc.view.frame = bounds
    vc.didMove(toParent: parentVC)
    self.previewCommentsViewController = vc
  }
  
  func presentProfileViewController(userUUID: UUID, presentationType: VFProfilePresentationType){
      guard let parentViewController = parentViewController, let settings = settings else {
          return
      }

      let callbacks: VFActionsCallbacks = { type in
          switch type {
          case .notificationPressed(let presentationType):
              switch presentationType {
              case .profile(let userUUID):
                  self.presentProfileViewController(userUUID: userUUID, presentationType: .feed)
                  break
              case .content(let containerUUID, let contentUUID, let containerId):
                  break
              }
          default:
              break
          }
      }
      
      guard let profileViewController = VFProfileViewController.new(userUUID: userUUID, presentationType: presentationType, loginDelegate: self, settings: settings) else{
          return
      }

      profileViewController.setActionCallbacks(callbacks: callbacks)
      parentViewController.present(profileViewController, animated: true)
  }
  
  func presentNewCommentViewController(actionType: VFNewCommentActionType){
      guard let parentViewController = parentViewController, let settings = settings, let articleMetadata = articleMetadata else {
          return
      }

      let callbacks: VFActionsCallbacks = { type in
          switch type {
          default:
              break
          }
      }
      
      guard let newCommentViewController = VFNewCommentViewController.new(newCommentActionType: actionType, containerId: containerId, articleMetadata: articleMetadata, loginDelegate: self, settings: settings) else{
          return
      }
      newCommentViewController.setActionCallbacks(callbacks: callbacks)
      parentViewController.present(newCommentViewController, animated: true)
  }

  func startLogin() {

  }
}

extension UIView {
  var parentViewController: UIViewController? {
    var parentResponder: UIResponder? = self
    while parentResponder != nil {
      parentResponder = parentResponder!.next
      if let viewController = parentResponder as? UIViewController {
        return viewController
      }
    }
    return nil
  }
}
