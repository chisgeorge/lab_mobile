//
//  EventService.swift
//  steady
//
//  Created by Admin on 1/14/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation

class AuthService {
    static func login(username: String, password: String, succes: @escaping () -> Void, failure: @escaping(String) -> Void) {
        BackendManager.execute(request: AuthenticationRequest(username: username, password: password), succes: { param in
            if let token = param["token"] as? String {
                KeychainManager.shared.token = token
                succes()
            } else {
                failure("fail")
            }
        }, failure: { error in
            failure(error.localizedDescription)
        })
    }
}
