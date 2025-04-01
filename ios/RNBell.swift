//
//  RNBell.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 03/04/2024.
//

import ViafouraSDK

class RNBell: UIView, VFLoginDelegate {
    let fontBold = UIFont.boldSystemFont(ofSize: 17)

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder aDecoder: NSCoder) { fatalError("nope") }

    var bellView: VFNotificationBellView?
    @objc var darkMode = false

    var settings: VFSettings?

    override func layoutSubviews() {
        super.layoutSubviews()
      
        if bellView == nil {
            initializeSettings()
            embed()
        }
    }

    func initializeSettings() {
        let colors = VFColors(
            colorPrimary: UIColor(red: 0.00, green: 0.45, blue: 0.91, alpha: 1.00),
            colorPrimaryLight: UIColor(red: 0.90, green: 0.95, blue: 1.00, alpha: 1.00))
        let fonts = VFFonts(fontBold: fontBold)
        settings = VFSettings(colors: colors, fonts: fonts)
    }

    private func embed() {
        guard let parentVC = parentViewController, let settings = settings else {
            return
        }

        bellView = VFNotificationBellView(
            settings: settings, loginDelegate: self,
            onBellClicked: { [weak self] userUUID in
              self?.presentProfileViewController(userUUID: userUUID, presentationType: .profile)
            })

        bellView?.frame = CGRect(x: 0, y: 0, width: bounds.width, height: bounds.height)
        addSubview(bellView!)
    }

    func presentProfileViewController(userUUID: UUID, presentationType: VFProfilePresentationType) {
        guard let parentViewController = parentViewController, let settings = settings else {
            return
        }

        let callbacks: VFActionsCallbacks = { [weak self] type in
            switch type {
            case .notificationPressed(let presentationType):
                switch presentationType {
                case .profile(let userUUID):
                    self?.presentProfileViewController(userUUID: userUUID, presentationType: .feed)
                    break
                case .content(let containerUUID, let contentUUID, let containerId, let articleMetadata):
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

    func startLogin() {
        RTEEventEmitter.shared?.emitEvent(withName: "onAuthNeeded", body: [:])
    }
}
