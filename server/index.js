/**
 * Created by fReDDy on 13.04.2016.
 */
var returnJSONResults = function(baseName, queryName) {
    var XMLPath = "../xml/input.xml";
    var rawJSON = loadXMLDoc(XMLPath);
    function loadXMLDoc(filePath) {
        var fs = require('fs');
        var xml2js = require('xml2js');
        var json;
        try {
            var fileData = fs.readFileSync(filePath, 'ascii');

            var parser = new xml2js.Parser();
            parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                json = JSON.stringify(result);
                /*console.log(JSON.stringify(result));*/
            });
            console.log("File '" + filePath + "/ was successfully read.\n");
            return json;
        } catch (ex) {console.log(ex)}
    }
    console.log(rawJSON);
}();