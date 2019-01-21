//
//  AuthRequest.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation
import Alamofire

class AuthenticationRequest: RequestRepresentable {
    var suffix: String
    var methodType: HTTPMethod
    var parameters: [ String: Any ]
    
    init(username: String, password: String) {
        self.suffix = "/login"
        self.methodType = .post
        self.parameters = ["username": username, "password": password]
    }
}
