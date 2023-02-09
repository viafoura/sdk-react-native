//
//  AuthService.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 01/02/2023.
//

import ViafouraSDK
@objc(RCTAuthService)
class RCTAuthService: NSObject {
  let authService = ViafouraSDK.auth()
  
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc(logout: reject:)
  func logout(_ resolve: @escaping RCTPromiseResolveBlock,
              rejecter reject: @escaping RCTPromiseRejectBlock){
    authService.logout()
    resolve("Success")
  }
  
  @objc(socialLogin: provider: resolve: reject:)
  func socialLogin(_ token: String, provider: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    authService.socialLogin(token: token, provider: VFSocialLoginProvider(rawValue: provider)!, completion: { result in
      switch(result){
      case .success(let user):
        resolve("Success")
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
  
  @objc(openIdLogin: resolve: reject:)
  func openIdLogin(_ token: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    authService.openIdLogin(token: token, completion: { result in
      switch(result){
      case .success(let user):
        resolve("Success")
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
  
  @objc(login: password: resolve: reject:)
  func login(_ email: String, password: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock)  {
    authService.login(email: email, password: password, completion: { result in
      switch(result){
      case .success(let user):
        resolve("Success")
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
  
  @objc(cookieLogin: resolve: reject:)
  func cookieLogin(_ cookie: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    authService.cookieLogin(token: "token", type: "type", completion: { result in
      switch(result){
      case .success(let user):
        resolve("Success")
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
  
  @objc(signup: email: password: resolve: reject:)
  func signup(_ name: String, email: String, password: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    authService.signup(name: "", email: "", password: "", completion: { result in
      switch(result){
      case .success(let user):
        resolve("Success")
        break
      case.failure(let error):
        reject("0", "Error", nil)
        break
      }
    })
  }
}
