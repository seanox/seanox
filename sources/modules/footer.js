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
 *  Static components and methods for the UI component footer.
 *  
 *  UI Footer 1.0 20181020
 *  Copyright (C) 2018 Seanox Software Solutions
 *  Alle Rechte vorbehalten.
 *
 *  @author  Seanox Software Solutions
 *  @version 1.0 20181020
 */ 
var footer = {
        
    /**
     *  Returns the current path as an object array [{path, name}, ...].
     *  @return the current path as an object array
     */
    locate: function() {
        var paths = SiteMap.locate(null, true);
        var items = new Array({path:"#", name:location.hostname});
        if (paths == "#")
            return items;
        paths.replace(/^#+/, "").split(/#+/).forEach(function(path, index, array) {
            var name = Messages[path + ".title"];
            if (items.length == 1)
                items.push({path:"#" + path, name:name});
            else items.push({path:items[items.length -1].path + "#" + path, name:name});
        });
        return items;
    },
    
    top: {
        
        /** 
         *  Scrolls to the top of the page.
         *  @param event
         */
        onClick: function(event) {
            window.scrollTo(0, 0);
        }
    }
};