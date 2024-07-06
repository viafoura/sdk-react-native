import AVFoundation
import Foundation
import ViafouraSDK

class RNPreviewComments: UIView, VFLoginDelegate, VFLayoutDelegate {
    let fontBold = UIFont.boldSystemFont(ofSize: 17)

    weak var previewCommentsViewController: VFPreviewCommentsViewController?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder aDecoder: NSCoder) { fatalError("nope") }

    @objc var containerId = ""
    @objc var authorId = ""
    @objc var articleUrl = ""
    @objc var articleTitle = ""
    @objc var articleSubtitle = ""
    @objc var articleThumbnailUrl = ""
    @objc var darkMode = false

    var settings: VFSettings?
    var articleMetadata: VFArticleMetadata?

    override func layoutSubviews() {
        super.layoutSubviews()

        if previewCommentsViewController == nil {
            initializeSettings()
            embed()
        } else {
            previewCommentsViewController?.view.frame = bounds
        }
    }

    func initializeSettings() {
        let colors = VFColors(
            colorPrimary: UIColor(red: 0.00, green: 0.45, blue: 0.91, alpha: 1.00),
            colorPrimaryLight: UIColor(red: 0.90, green: 0.95, blue: 1.00, alpha: 1.00))
        let fonts = VFFonts(fontBold: fontBold)
        settings = VFSettings(colors: colors, fonts: fonts)

        guard let articleUrl = URL(string: articleUrl),
            let thumbnailUrl = URL(string: articleThumbnailUrl)
        else {
            return
        }

        articleMetadata = VFArticleMetadata(
            url: articleUrl, title: articleTitle, subtitle: articleSubtitle,
            thumbnailUrl: thumbnailUrl)
    }

    private func embed() {
        guard let parentVC = parentViewController, let settings = settings,
            let articleMetadata = articleMetadata
        else {
            return
        }

        let vc = VFPreviewCommentsViewController.new(
          containerId: containerId,
          articleMetadata: articleMetadata,
          loginDelegate: self,
          settings: settings,
          defaultSort: .newest
        )

        let callbacks: VFActionsCallbacks = { [weak self] type in
            switch type {
            case .writeNewCommentPressed(let actionType):
                self?.presentNewCommentViewController(actionType: actionType)
            case .trendingArticlePressed(let metadata, let containerId):
              RTEEventEmitter.shared?.emitEvent(withName: "onArticlePressed", body: ["containerId": containerId, "articleUrl": metadata.url.absoluteString])
                break
            case .seeMoreCommentsPressed:
                break
            case .openProfilePressed(let userUUID, let presentationType):
                self?.presentProfileViewController(
                    userUUID: userUUID, presentationType: presentationType)
            default:
                break
            }
        }

        vc.setActionCallbacks(callbacks: callbacks)
        vc.setLayoutDelegate(layoutDelegate: self)
        vc.setAuthorsIds(authors: [authorId])
        vc.setAdDelegate(adDelegate: self)

        parentVC.addChild(vc)
        addSubview(vc.view)
        vc.view.frame = bounds
        vc.didMove(toParent: parentVC)
        vc.setTheme(theme: darkMode ? .dark : .light)
        self.previewCommentsViewController = vc
    }

    func presentProfileViewController(userUUID: UUID, presentationType: VFProfilePresentationType) {
        guard let parentViewController = parentViewController, let settings = settings else {
            return
        }

        let callbacks: VFActionsCallbacks = { [weak self] type in
            switch type {
            case .trendingArticlePressed(let metadata, let containerId):
              RTEEventEmitter.shared?.emitEvent(withName: "onArticlePressed", body: ["containerId": containerId, "articleUrl": metadata.url.absoluteString])
                break
            case .notificationPressed(let presentationType):
                switch presentationType {
                case .profile(let userUUID):
                    self?.presentProfileViewController(userUUID: userUUID, presentationType: .feed)
                    break
                case .content(let containerUUID, let contentUUID, let containerId):
                    break
                }
            default:
                break
            }
        }

        let profileViewController = VFProfileViewController.new(
          userUUID: userUUID,
          presentationType: presentationType,
          loginDelegate: self,
          settings: settings
        )

        profileViewController.setActionCallbacks(callbacks: callbacks)
        profileViewController.setTheme(theme: darkMode ? .dark : .light)
        parentViewController.present(profileViewController, animated: true)
    }

    func presentNewCommentViewController(actionType: VFNewCommentActionType) {
        guard let parentViewController = parentViewController, let settings = settings,
            let articleMetadata = articleMetadata
        else {
            return
        }

        let callbacks: VFActionsCallbacks = { type in
            switch type {
            case .commentPosted(let contentUUID):
                RTEEventEmitter.shared?.emitEvent(withName: "onNewComment", body: nil)
                break
            case .replyPosted(let contentUUID):
                break
            default:
                break
            }
        }

        let newCommentViewController = VFNewCommentViewController.new(
          newCommentActionType: actionType,
          containerId: containerId,
          articleMetadata: articleMetadata,
          loginDelegate: self,
          settings: settings
        )
  
        newCommentViewController.setActionCallbacks(callbacks: callbacks)
        newCommentViewController.setTheme(theme: darkMode ? .dark : .light)
        parentViewController.present(newCommentViewController, animated: true)
    }

    func containerHeightUpdated(viewController: VFUIViewController, height: CGFloat) {
        RTEEventEmitter.shared?.emitEvent(
            withName: "onHeightChanged", body: ["newHeight": height, "containerId": containerId])
    }

    func startLogin() {
        RTEEventEmitter.shared?.emitEvent(withName: "onAuthNeeded", body: [:])
    }
}

extension RNPreviewComments: VFAdDelegate {
    func getAdInterval(viewController: VFUIViewController) -> Int {
        return 5
    }

    func generateAd(viewController: VFUIViewController, adPosition: Int) -> VFAdView {
        let adView = VFAdView()
        return adView
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
