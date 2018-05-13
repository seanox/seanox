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
 *  Static components and methods for the UI section Projects.
 *  
 *  Projects 1.0 20180513
 *  Copyright (C) 2018 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20180513
 */
if (typeof(Changes) == "undefined") {
    
    Changes = {};
    
    Changes.cache;
    
    Changes.URL = "https://raw.githubusercontent.com/seanox/?/master/CHANGES";
    
    Changes.read = function(project) {
        
        Changes.cache = Changes.cache || {};
        if (Changes.cache.hasOwnProperty(project))
            return Changes.cache[project];
        var request = new XMLHttpRequest();
        request.open("GET", Changes.URL.replace(/\?/, project), false);
        request.overrideMimeType("text/plain");
        request.send();
        var changes = request.status != 200 ? null : request.responseText.trim();
        Changes.cache[project] = changes;
        return changes;
    };
};

Composite.customize("x-projects", function(element) {

    window.setTimeout(function() {
    
        //loading the project list
        var projects = DataSource.fetch("xml://projects");
        projects = projects.evaluate("//project/@id", projects, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        var collection = new Array();
        for (var node = projects.iterateNext(); node; node = projects.iterateNext()) {
            
            //building the collection
            var project = node.nodeValue;
            collection.push("xml://project-" + project);
        
            //loading from change-log and determining the version
            var changes = Changes.read(project);
            var version = String(changes ? changes.match(/^[\d\.\s]+$/m) || "" : "").trim();
            if (!version)
                continue;
            
            //injection of version + release (date) into project
            project = DataSource.manipulate("xml://project-" + project);
            project = project.evaluate("/project", project, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            project = project.iterateNext();
            version = version.split(/\s+/);
            project.setAttribute("version", version[0]);
            project.setAttribute("release", version[1]);
        }
        
        //fetching the collection
        projects = DataSource.collect(collection);
    
        //transformation and output
        var style = DataSource.fetch("xslt://projects");
        projects = DataSource.transform(projects, style);
        element.appendChild(content, true);
    }, 0);
});