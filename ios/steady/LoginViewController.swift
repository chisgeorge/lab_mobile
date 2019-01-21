//
//  LoginViewController.swift
//  steady
//
//  Created by Admin on 1/14/19.
//  Copyright © 2019 daydream. All rights reserved.
//

import Foundation
import UIKit

class LoginViewController: UIViewController, UITextFieldDelegate {
    
    var usernameTextField : UITextField!
    var passwordTextField : UITextField!
    
    override func viewWillAppear(_ animated: Bool) {
        if KeychainManager.shared.token != "Basic" {
            self.navigationController?.present(ViewController(), animated: false, completion: {
                
            })
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        usernameTextField = UITextField(frame: CGRect(x: 10, y: 100, width: 300, height: 40))
        usernameTextField.placeholder = "Enter username"
        usernameTextField.font = UIFont.systemFont(ofSize: 16)
        usernameTextField.borderStyle = UITextField.BorderStyle.roundedRect
        usernameTextField.autocorrectionType = UITextAutocorrectionType.no
        usernameTextField.keyboardType = UIKeyboardType.default
        usernameTextField.returnKeyType = UIReturnKeyType.done
        usernameTextField.clearButtonMode = UITextField.ViewMode.whileEditing
        usernameTextField.contentVerticalAlignment = UIControl.ContentVerticalAlignment.center
        usernameTextField.delegate = self
        self.view.addSubview(usernameTextField)
        
        passwordTextField = UITextField(frame: CGRect(x: 10, y: 150, width: 300, height: 40))
        passwordTextField.placeholder = "Enter username"
        passwordTextField.font = UIFont.systemFont(ofSize: 16)
        passwordTextField.borderStyle = UITextField.BorderStyle.roundedRect
        passwordTextField.autocorrectionType = UITextAutocorrectionType.no
        passwordTextField.keyboardType = UIKeyboardType.default
        passwordTextField.returnKeyType = UIReturnKeyType.done
        passwordTextField.clearButtonMode = UITextField.ViewMode.whileEditing
        passwordTextField.contentVerticalAlignment = UIControl.ContentVerticalAlignment.center
        passwordTextField.delegate = self
        passwordTextField.isSecureTextEntry = true
        self.view.addSubview(passwordTextField)
        
        let button = UIButton(frame: CGRect(x: 110, y: 200, width: 100, height: 40))
        button.backgroundColor = .green
        button.layer.cornerRadius = 20
        button.setTitleColor(.black, for: .normal)
        button.setTitle("Login", for: .normal)
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        
        self.view.addSubview(button)
        
        navigationController?.isNavigationBarHidden = true
        
        setGradientBackground()
    
    }
    
    @objc func buttonAction(sender: UIButton!) {
        AuthService.login(username: usernameTextField.text!, password: passwordTextField.text!, succes: {
            self.navigationController?.present(ViewController(), animated: true, completion: {
                
            })
        }) { (String) in
            
        }
        
    }
    
    func setGradientBackground() {
        let colorTop =  UIColor(red: 255.0/255.0, green: 149.0/255.0, blue: 0.0/255.0, alpha: 1.0).cgColor
        let colorBottom = UIColor(red: 255.0/255.0, green: 94.0/255.0, blue: 58.0/255.0, alpha: 1.0).cgColor
        
        let gradientLayer = CAGradientLayer()
        gradientLayer.colors = [colorTop, colorBottom]
        gradientLayer.locations = [0.0, 1.0]
        gradientLayer.frame = self.view.bounds
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    
    
}
