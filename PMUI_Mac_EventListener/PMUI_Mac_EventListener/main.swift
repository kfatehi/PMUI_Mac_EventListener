//
//  main.swift
//  PMUI_Mac_EventListener
//
//  Copyright © 2016 pmui. All rights reserved.
//

import Cocoa
import Foundation
import AppKit

class UserEventListener: NSObject, NSApplicationDelegate {
    
    
    var user_state = ""
    var timer  = NSTimer()
    var cdatetime = ""
    var active_countdown = 0;

    
    override init() {
        
        super.init();
        self.user_state = "USER_IDLE"
        self.active_countdown = 0
        self.setTimeVariables()
        self.printUserEventJson(6)

        self.timer = NSTimer(timeInterval: 1.0, target: self, selector: "checkState", userInfo: nil, repeats: true)
        NSRunLoop.currentRunLoop().addTimer(timer, forMode: NSRunLoopCommonModes)
        
       
        startGlobalInputListeners()
        
    

        
    }//end init
    
    //if countdown reaches 300 seconds (5 mins). change to USER_IDLE
    func checkState() {
        if(self.user_state=="USER_ACTIVE"){
        self.active_countdown = self.active_countdown + 1
        }
        if(self.active_countdown >= 300 && self.user_state == "USER_ACTIVE"){
            user_state = "USER_IDLE"
            self.setTimeVariables()
            self.printUserEventJson(8)

        }
        
    }

    func setTimeVariables(){
        let date = NSDate()
        let calendar = NSCalendar.currentCalendar()
        let components = calendar.components([ .Year, .Month, .Day, .Hour, .Minute, .Second], fromDate: date)
        self.cdatetime = "\(components.month)-\(components.day)-\(components.year) \(components.hour):\(components.minute):\(components.second)"
    }
    
    func startGlobalInputListeners(){
    
    NSEvent.addGlobalMonitorForEventsMatchingMask(
        [NSEventMask.KeyDownMask,  NSEventMask.LeftMouseDownMask, NSEventMask.RightMouseDownMask, NSEventMask.OtherMouseDownMask, NSEventMask.MouseMovedMask , NSEventMask.ScrollWheelMask], handler: {(event: NSEvent) in
           // print(event)
  
            self.setTimeVariables()
            if(self.user_state == "USER_IDLE"){
                
                self.user_state = "USER_ACTIVE";
                self.printUserEventJson(7)
            }
            
            self.resetTimer()
           
    })

    
    }
    
    func resetTimer(){

        self.active_countdown = 0
        self.timer.invalidate()
        self.timer = NSTimer(timeInterval: 1.0, target: self, selector: "checkState", userInfo: nil, repeats: true)
        NSRunLoop.currentRunLoop().addTimer(self.timer, forMode: NSRunLoopCommonModes)
    }
    
    func printUserEventJson(id: Int16){
           print("{\"event\": {\"macEventId\":\"\(id)\",\"timestamp\":\"\(self.cdatetime)\",\"name\":\"\(self.user_state)\"}}");
    }
    
    
    /*get privileges for application*/
    func applicationDidFinishLaunching(notification: NSNotification) {
        acquirePrivileges()
    }
    
    func acquirePrivileges() -> Bool {
        let accessEnabled = AXIsProcessTrustedWithOptions(
            [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true])
        
        if accessEnabled != true {
            print("You PMUI EventListener in the System Preferences")
        }
        return accessEnabled == true
    }


} //end UserEventListener




// preparing main loop
let application = NSApplication.sharedApplication()
let applicationDelegate = UserEventListener()
application.delegate = applicationDelegate
application.activateIgnoringOtherApps(true)
application.run()



