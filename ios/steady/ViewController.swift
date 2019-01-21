//
//  ViewController.swift
//  steady
//
//  Created by Admin on 9/6/18.
//  Copyright © 2018 daydream. All rights reserved.
//

import UIKit
//import CollectionKit

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var list : [Event] = []
    private var myTableView: UITableView!
   
    override func viewWillAppear(_ animated: Bool) {
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        let button = UIButton(frame: CGRect(x: 140, y: 20, width: 100, height: 40))
        button.backgroundColor = .red
        button.layer.cornerRadius = 20
        
        button.setTitle("Logout", for: .normal)
        button.addTarget(self, action: #selector(logoutAction), for: .touchUpInside)
        
        let button2 = UIButton(frame: CGRect(x: 40, y: 20, width: 80, height: 40))
        button2.backgroundColor = .black
        button2.layer.cornerRadius = 20
        
        button2.setTitle("Refresh", for: .normal)
        button2.addTarget(self, action: #selector(refresh), for: .touchUpInside)
        
        
        
        myTableView = UITableView(frame: CGRect(x: 0, y: 60, width: 320, height: 600))
        myTableView.register(UITableViewCell.self, forCellReuseIdentifier: "PlainCell")
        myTableView.dataSource = self
        myTableView.delegate = self
        self.view.addSubview(myTableView)
        
        self.view.addSubview(button)
        self.view.addSubview(button2)
        
        if(PersistanceManager.shared.getList() != nil)
        {
            
            self.list = PersistanceManager.shared.getList()!
            self.myTableView.reloadData();
        }
        else {
        EventService.getEvents(succes: { (returnList) in
            print("returned")
            PersistanceManager.shared.setList(events: returnList)
            self.list = returnList
            self.myTableView.reloadData();
        }) { (error) in
            print(error)
            }
            
        }
        
    }
    
    @objc func logoutAction(sender: UIButton!) {
        KeychainManager.shared.token = "Basic"
        self.dismiss(animated: true) {
            
        }
    }
    @objc func refresh(sender: UIButton!) {
        EventService.getEvents(succes: { (returnList) in
            print("returned")
            PersistanceManager.shared.setList(events: returnList)
            self.list = returnList
            self.myTableView.reloadData();
        }) { (error) in
            print(error)
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // Create an object of the dynamic cell "PlainCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: "PlainCell", for: indexPath)
        // Depending on the section, fill the textLabel with the relevant text
        cell.textLabel?.text = list[indexPath.row].title
        
        // Return the configured cell
        return cell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return list.count
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        let editAction = UITableViewRowAction(style: .default, title: "Edit", handler: { (action, indexPath) in
            let alert = UIAlertController(title: "", message: "Edit list item", preferredStyle: .alert)
            alert.addTextField(configurationHandler: { (textField) in
                textField.text = self.list[indexPath.row].title
            })
            alert.addAction(UIAlertAction(title: "Update", style: .default, handler: { (updateAction) in
                self.list[indexPath.row].title = alert.textFields!.first!.text!
                self.myTableView.reloadRows(at: [indexPath], with: .fade)
            }))
            alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
            self.present(alert, animated: false)
        })
        
        let deleteAction = UITableViewRowAction(style: .default, title: "Delete", handler: { (action, indexPath) in
            self.list.remove(at: indexPath.row)
            tableView.reloadData()
        })
        
        return [deleteAction, editAction]
    }
    
}

