//
//  AuthService.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 01/02/2023.
//

import ViafouraSDK
@objc(RCTAuthService)
class RCTCommentsService: NSObject {
  let commentsService = ViafouraSDK.comments()
  
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  
  @objc(containerId: resolve: reject:)
  func commentCount(_ containerId: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    commentsService.commentCount(containerId: containerId, completion: { result in
      switch(result){
      case .success(let count):
        resolve(String(count))
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
}
