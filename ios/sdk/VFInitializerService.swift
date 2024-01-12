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
    ViafouraSDK.initialize(siteUUID: "00000000-0000-4000-8000-032a225cd465", siteDomain: "www.thestar.com")
    ViafouraSDK.setLoggingEnabled(true)
  }
}
