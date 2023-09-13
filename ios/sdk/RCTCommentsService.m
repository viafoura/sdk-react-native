//
//  RCTAuthService.swift
//  ViafouraDemo
//
//  Created by Martin De Simone on 01/02/2023.
//

#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(RCTCommentsService, NSObject)
RCT_EXTERN_METHOD(commentCount: (NSString*)containerId resolve: (RCTPromiseResolveBlock) resolve
                  reject: (RCTPromiseRejectBlock) reject)
@end
