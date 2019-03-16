/**
 *  LIZENZBEDINGUNGEN - Seanox Software Solutions ist ein Open-Source-Projekt,
 *  im Folgenden Seanox Software Solutions oder kurz Seanox genannt. Diese
 *  Software unterliegt der Version 2 der GNU General Public License.
 *
 *  Seanox Online
 *  Copyright (C) 2019 Seanox Software Solutions
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
 *  Static components and methods for the UI component projects.
 *  
 *  UI Projects 1.0 20190316
 *  Copyright (C) 2019 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20190316
 */
window['projects'] = {

    changes: {

        cache: {},
        
        URL: "https://raw.githubusercontent.com/seanox/?/master/CHANGES",
        
        read: function(project) {

            this.cache = this.cache || {};
            if (this.cache.hasOwnProperty(project))
                return this.cache[project];
            var request = new XMLHttpRequest();
            request.open("GET", this.URL.replace(/\?/, project), false);
            request.overrideMimeType("text/plain");
            request.send();
            if (request.status != 200)
                return null;
            var changes = request.responseText.trim();
            this.cache[project] = changes;
            return changes;
        }
    },
    
    version: function(project) {

        //loading the project list
        //injection of version + release (date) into project
        var publish = (project) => {
            var changes = this.changes.read(project) || "";
            var version = String(changes.match(/^[\d\.\s]+$/m) || "").trim();
            var output = document.querySelector("*[id='projects " + project + "'] > h3 span ~ span");
            output.textContent = version;
        };
        
        this.cache = this.cache || {};
        if (this.cache.hasOwnProperty(project))
            publish(project);
        else window.setTimeout(publish, 0, project);
    }
};