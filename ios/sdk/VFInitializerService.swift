//
//  VFInitializerService.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 02/02/2023.
//

import Foundation
import ViafouraSDK

@objc
class VFInitializerService: NSObject {
  @objc
  static let shared = VFInitializerService()
  
  private override init() {
    super.init()
  }
  
  @objc
  func initialize(){
    ViafouraSDK.initialize(siteUUID: "00000000-0000-4000-8000-c8cddfd7b365", siteDomain: "viafoura-mobile-demo.vercel.app")
    ViafouraSDK.setLoggingEnabled(true)
  }
}
