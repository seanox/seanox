/**
 *  LIZENZBEDINGUNGEN - Seanox Software Solutions ist ein Open-Source-Projekt,
 *  im Folgenden Seanox Software Solutions oder kurz Seanox genannt. Diese
 *  Software unterliegt der Version 2 der GNU General Public License.
 *
 *  Seanox Online
 *  Copyright (C) 2018 Seanox Software Solutions
 *
 *  This program is free software; you can redistribute it and/or modify it
 *  under the terms of version 2 of the GNU General Public License as published
 *  by the Free Software Foundation.
 *
 *  This program is distributed in the hope that it will be useful, but WITHOUT
 *  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 *  more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *  
 *  
 *      DESCRIPTION
 *      ----
 *  Static component for general error handling.
 *  
 *  UI Error 1.0 20181017
 *  Copyright (C) 2018 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20181017
 *  
 *  
 *  Enhancement of the JavaScript API
 *  Adds the time from the start of the application to the window object.
 */   
if (window.timing === undefined) {
    window.timing = new Date().getTime();
};

/**
 *  Acceptor for the path #error.
 *  The path should be usable if an error has occurred.
 */
SiteMap.customize(/^#error$/i, function(path) {
    if (!window.error
            || !window.error.serial
            || !window.error.cause)
        SiteMap.navigate("#");
});

/**
 *  Error Listener
 *  Registers errors that occur, send the error information to the message
 *  service of seanox.de and forward to the error page.
 *  The last error that occurred is stored in the window object in the property
 *  error. If another error occurs, the error property is overwritten with the
 *  new error information.
 */
Composite.listen(Composite.EVENT_ERROR, function(event, cause) {
    
    var timing = new Date().getTime();
    var serial = window.serial;
    serial += "-" + (timing -window.timing).toString(36).toUpperCase();
    serial += "-" + (timing -946684800000).toString(36).toUpperCase();
    window.error = {serial:serial, cause:cause};

    var browser = navigator.userAgent;
    var message = cause.message;
    var stack = cause.error.stack;
    var location = cause.filename || "unknown";
    location = location.replace(/^\w+:\/+.+?((?=\/)|$)/, "");
    if (cause.lineno)
        location += ":" + cause.lineno;
    if (cause.colno)
        location += ":" + cause.colno;
    
    var request = new XMLHttpRequest();
    request.open("POST", "http://message.seanox.de", true);
    request.setRequestHeader("Message-Context", "seanox.de");
    request.setRequestHeader("Message-Serial", window.error.serial);
    request.setRequestHeader("Message-Level", "ERROR");
    request.setRequestHeader("Message-Scope", location);
    request.setRequestHeader("Message-Message", (browser + "\n" + message).encodeHex());
    request.setRequestHeader("Message-Trace", JSON.stringify(stack).encodeHex());
    request.send(); 
    
    SiteMap.navigate("#error");
});