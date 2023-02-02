//
//  RCTAuthService.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 01/02/2023.
//

#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(RCTAuthService, NSObject)
RCT_EXTERN_METHOD(logout: (RCTPromiseResolveBlock) resolve
                  reject: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(login: (NSString *)email password:(NSString *)password resolve: (RCTPromiseResolveBlock) resolve
                  reject: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(openIdLogin: (NSString*)token resolve: (RCTPromiseResolveBlock) resolve
                  reject: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(socialLogin: (NSString*)token provider:(NSString *)provider resolve: (RCTPromiseResolveBlock) resolve
                  reject: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(signup: (NSString *)name email:(NSString *)email password:(NSString *)password resolve: (RCTPromiseResolveBlock) resolve reject: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(cookieLogin: (NSString *)token resolve: (RCTPromiseResolveBlock) resolve reject: (RCTPromiseRejectBlock) reject)
@end
