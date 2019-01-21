//
//  GetRequest.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation
import Alamofire
class GetRequest: RequestRepresentable {
    var suffix: String
    var methodType: HTTPMethod
    var parameters: [ String: Any ]
    
    init() {
        self.suffix = "/events"
        self.methodType = .get
        self.parameters = [:]
    }
}
