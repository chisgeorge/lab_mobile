//
//  PersistanceManager.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation
class PersistanceManager {
    
    static let list_key = "events_list"
    static let shared = PersistanceManager()
    private let userDefault = UserDefaults.standard
    
    func getList() -> [Event]?{
        if let unarchivedObject = userDefault.object(forKey: PersistanceManager.list_key) as? Data {
            return NSKeyedUnarchiver.unarchiveObject(with: unarchivedObject as Data) as? [Event]
        }
        return nil
    }
    func setList(events: [Event]?)
    {
        let archivedObject = NSKeyedArchiver.archivedData(withRootObject: events! as NSArray) as NSData
        userDefault.set(archivedObject, forKey: PersistanceManager.list_key)
        userDefault.synchronize()
}
}
