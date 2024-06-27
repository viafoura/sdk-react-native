//
//  ReactNativeEventEmitter.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 01/02/2023.
//
import Foundation

@objc(RTEEventEmitter)
class RTEEventEmitter : RCTEventEmitter {
    static var shared: RTEEventEmitter?
    
    private var supportedEventNames: Set<String> = ["onHeightChanged", "onAuthNeeded", "onArticlePressed"]
    private var hasAttachedListener = false

    override init() {
        super.init()
        RTEEventEmitter.shared = self
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func startObserving() {
        hasAttachedListener = true
    }
  
    override func stopObserving() {
        hasAttachedListener = false
    }

    override func supportedEvents() -> [String] {
        return Array(supportedEventNames)
    }
  
    func emitEvent(withName name: String, body: Any!) {
        if hasAttachedListener && supportedEventNames.contains(name) {
            sendEvent(withName: name, body: body)
        }
    }
}
