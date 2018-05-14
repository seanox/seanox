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
 *  Static components and methods for the UI section Contact.
 *  
 *  Contact 1.0 20180428
 *  Copyright (C) 2018 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20180428
 */
Composite.customize("x-contact", function(element) {
    
    var content = DataSource.fetch("xml://contact", true, true);
    element.appendChild(content, true);
});

Namespace.using("Contact");

Contact.createMail = function(mail) {
    
    var serial = window.serial + "-" + (new Date().getTime() -946681200000).toString(36).toUpperCase();
    var contact = DataSource.fetch("xml://contact");
    var root = "/contact/mails/" + mail;
    return {
        recipient: contact.evaluate(root + "/recipient", contact, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue.textContent.decodeBase64(),
        subject: contact.evaluate(root + "/subject", contact, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue.textContent.replace(/\{1\}/g, serial),
        content: contact.evaluate(root + "/content", contact, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue.textContent.replace(/\{1\}/g, serial).unescape()
    };
};

Contact.createMailLink = function(mail) {
    mail = Contact.createMail(mail);
    return "mailto:" + mail.recipient + "?subject=" + encodeURIComponent(mail.subject) + "&body=" + encodeURIComponent(mail.content);
};

ContactDevelopmentLink = {
    onClick: function() {
        var mail = Contact.createMailLink("development");
        document.location.href = mail;
        return false;
    }  
};

ContactServiceLink = {
    onClick: function() {
        var mail = Contact.createMailLink("service");
        document.location.href = mail;
        return false;
    }  
};

ContactSupportLink = {
    onClick: function() {
        var mail = Contact.createMailLink("support");
        document.location.href = mail;
        return false;
    }  
};