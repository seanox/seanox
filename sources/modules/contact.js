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
 *  Static components and methods for the UI component contact.
 *  
 *  UI Contact 1.0 20180428
 *  Copyright (C) 2018 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20180428
 */
window["contact"] = {
        
    createMail: function(mail) {
        var serial = window.serial + (new Date().getTime() -window.timing).toString(36).toUpperCase();
        var contact = DataSource.fetch("xml://contact");
        var root = "/contact/mails/" + mail;
        return {
            recipient: contact.evaluate("string(" + root + "/recipient)", contact, null, XPathResult.ANY_TYPE, null)
                .stringValue.decodeBase64(),
            subject: contact.evaluate("string(" + root + "/subject)", contact, null, XPathResult.ANY_TYPE, null)
                .stringValue.replace(/\{1\}/g, serial),
            content: contact.evaluate("string(" + root + "/content)", contact, null, XPathResult.ANY_TYPE, null)
                .stringValue.replace(/\{1\}/g, serial).unescape()};
    },
    
    createMailLink: function(mail) {
        mail = contact.createMail(mail);
        return "mailto:" + mail.recipient + "?subject=" + encodeURIComponent(mail.subject) + "&body=" + encodeURIComponent(mail.content);
    },    
    
    mail: {
        onClick: function(event) {
            var target = event.currentTarget;
            target = (target.getAttribute("id") || "").match(/[^:]+$/);
            if (!target)
                return false;
            var mail = contact.createMailLink(target);
            document.location.href = mail;
            return false;
        }
    }
};