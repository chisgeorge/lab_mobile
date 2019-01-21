//
//  Event.swift
//  steady
//
//  Created by Admin on 1/15/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation

class Event: NSObject, Codable, NSCoding	 {
    let id: String?
    var start: String?
    var end: String?
    var title: String?
    var desc: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case start
        case end
        case title
        case desc = "description"
    }
    
    required init(id: String, start: String, end: String, title: String, description: String) {
        self.id = id
        self.start = start
        self.end = end
        self.title = title
        self.desc = description
    }
    
    required init(coder aDecoder: NSCoder) {
     
        id = aDecoder.decodeObject(forKey: "id") as? String
        title = aDecoder.decodeObject(forKey: "title") as? String
        desc = aDecoder.decodeObject(forKey: "description") as? String
        start = aDecoder.decodeObject(forKey: "start") as? String
        end = aDecoder.decodeObject(forKey: "end") as? String
    }
    
    
    public func encode(with aCoder: NSCoder) {
        
        aCoder.encode(id, forKey: "id")
        aCoder.encode(title, forKey: "title")
        aCoder.encode(desc, forKey: "description")
        aCoder.encode(start, forKey: "start")
        aCoder.encode(end, forKey: "end")
        
    }
}
