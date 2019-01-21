//
//  KeychainManager.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import SwiftKeychainWrapper
import UIKit

class KeychainManager {

    static let tokenKey = "authToken"
    static let shared = KeychainManager()
    private let keychain = KeychainWrapper.standard

    var token: String? {
        get {
            return keychain.string(forKey: KeychainManager.tokenKey)
        }
        set {
            setToken(to: newValue!)
        }
    }

    private func setToken(to newValue: String?) {
        guard let token = newValue else {
            keychain.removeObject(forKey: KeychainManager.tokenKey)
            return
        }
        keychain.set(token, forKey: KeychainManager.tokenKey)
    }
}
