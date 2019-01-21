//
//  EventService.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation
class EventService {
    static func getEvents(succes: @escaping ([Event]) -> Void, failure: @escaping (Error) -> Void) {
        BackendManager.execute(request: GetRequest() as RequestRepresentable, succes: succes, failure:failure)
    }
}
