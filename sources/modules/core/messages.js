if (typeof(Messages) == "undefined") {
    
    Messages = {};

    (function() {

        var root = window.location.pathname;
        var data = (root + "/data").replace(/\/+/g, '/');
        var request = new XMLHttpRequest();
        request.open("GET", DataSource.DATA + "/locales.xml?1", false);
        request.overrideMimeType("application/xslt+xml");
        request.send();
        var xml = request.responseXML;   
        
        var locale = (navigator.browserLanguage || navigator.language || "").trim().toLowerCase();
        locale = locale.match(/^([a-z]+)/);
        locale = xml.evaluate((locale ? "/locales/" + locale[0] + " | " : "") + "/locales/*[@default]", xml, null, XPathResult.ANY_TYPE, null);
        locale = locale.iterateNext();
        for (var loop = 0; loop < locale.attributes.length; loop++) {
            var attribute = locale.attributes[loop];
            Messages[attribute.nodeName] = attribute.nodeValue;
        }
    })();
};