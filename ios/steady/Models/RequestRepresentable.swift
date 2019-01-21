//
//  RequestRepresentable.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Alamofire
import Foundation

protocol RequestRepresentable {
    var suffix: String { get }
    var methodType: HTTPMethod { get }
    var parameters: [String: Any] { get }
}
