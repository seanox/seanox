/**
 *  Enhancement of the JavaScript API
 *  Adds a function for creating a alhpanumeric (U)UID with fixed size to the
 *  Math object.
 *  @param size optional, default is 16
 */
if (Math.uniqueId === undefined) {
    Math.uniqueId = function(size) {
        size = size || 16;
        if (size < 0)
            sitze = 16;
        var unique = "";
        for (var loop = 0; loop < size; loop++) {
            var random = Math.floor(Math.random() * Math.floor(26));
            if ((Math.floor(Math.random() * Math.floor(26))) % 2 == 0)
                unique += String(random % 10);
            else unique += String.fromCharCode(65 +random); 
        }
        return unique;
    };
};

/**
 *  Enhancement of the JavaScript API
 *  Adds a property to get the UID for the window instance.
 */  
if (window.serial === undefined) {
    window.serial = Math.uniqueId();
};

Element.prototype.internalAppendChild = Element.prototype.appendChild;
Element.prototype.appendChild = function(node, exclusive) {
    if (exclusive)
        this.innerHTML = "";
    if (node instanceof NodeList) {
        node = Array.prototype.slice.call(node);
        for (var loop = 0; loop < node.length; loop++)
            this.internalAppendChild(node[loop]);
    } else this.internalAppendChild(node);
};