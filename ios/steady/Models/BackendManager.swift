//
//  BackendManager.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Alamofire
import Foundation

import Foundation
import Alamofire

class Connectivity {
    class func isConnectedToInternet() ->Bool {
        return NetworkReachabilityManager()!.isReachable
    }
}

class BackendManager {

    // MARK: - Private properties

    private static let baseURL = "http://172.20.10.2:3000"
    private static var headers: HTTPHeaders {
        var headerDict = ["Content-Type": "application/json", "Accept": "application/json"]
        if let token = KeychainManager.shared.token {
            headerDict["Authorization"] = "Bearer " + token
        }
        return headerDict
    }
    // MARK: - Lifecycle

    static func execute<T: Decodable>(request: RequestRepresentable, succes: @escaping ([T]) -> Void, failure: @escaping (Error) -> Void) {
        self.performRequest(url: baseURL + request.suffix, methodType: request.methodType, parameters: request.parameters, encoding: request.methodType.encoding, headers: headers, completion: { response in
            switch response.result {
            case .success:
                do {
                    guard let data = response.data else { return }
                    let returnValue = try JSONDecoder().decode([T].self, from: data)
                    succes(returnValue)
                } catch {
                    failure(error)
                }

            case .failure:
                failure(response.error!)
            }
        })
    }

    static func execute<T: Decodable>(request: RequestRepresentable, succes: @escaping (T) -> Void, failure: @escaping (Error) -> Void) {
        self.performRequest(url: baseURL + request.suffix, methodType: request.methodType, parameters: request.parameters, encoding: request.methodType.encoding, headers: headers, completion: { response in
            switch response.result {
            case .success:
                do {
                    guard let data = response.data else { return }
                    let returnValue = try JSONDecoder().decode(T.self, from: data)
                    succes(returnValue)
                } catch {
                    failure(error)
                }
            case .failure:
                failure(response.error!)
            }
        })
    }

    static func execute(request: RequestRepresentable, succes: @escaping ([ String: Any]) -> Void, failure: @escaping (Error) -> Void) {
        self.performRequest(url: baseURL + request.suffix, methodType: request.methodType, parameters: request.parameters, encoding: request.methodType.encoding, headers: headers, completion: { response in
            switch response.result {
            case .success:
                let dict = response.result.value as? [ String: Any]
                if let dict = dict {
                    succes(dict)
                }
            case .failure:
                failure(response.error!)
            }
        })
    }

    private static func performRequest(url: String, methodType: HTTPMethod, parameters: [String: Any], encoding: ParameterEncoding, headers: HTTPHeaders, completion: @escaping (DataResponse<Any>) -> Void) {
        Alamofire.request(url, method: methodType, parameters: parameters, encoding: encoding, headers: headers)
            .validate(statusCode: 200..<600)
            .validate(contentType: ["application/json"])
            .responseJSON { response in
                completion(response)
        }
    }
}
private extension HTTPMethod {
    var encoding: ParameterEncoding {
        switch self {
        case .post, .put:
            return JSONEncoding.default
        default:
            return URLEncoding.default
        }
    }
}
