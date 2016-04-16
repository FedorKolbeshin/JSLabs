/**
 * Created by fReDDy on 13.04.2016.
 */
var fs = require('fs'),
    http=require('http'),
    xml2js = require('xml2js'),
    XMLPath = "../xml/input.xml";
    //ejs = require('ejs'),
http.createServer(function (req, res) {
    console.log(req.url);
    console.log("нихуя пришел запрос");
    if (req.url=='/index.html') {
        fs.readFile('../index.html', function (err, html) {
                if (err) {
                    throw err;
                }

                res.writeHead(200,
                {'Content-Type': 'text/html; charset=utf-8'});
                 res.end(html);
            }
        );
    }
    if (req.url == '/getThatBitch') {
        console.log("таки мы здесь сучка!");
        res.url='http://127.0.0.1:1337/index.html';
        res.writeHead(200,{'Access-Control-Allow-Origin':'*'});
        console.log("нихуя запрос пришел");
        res.end(rawJSON);

    }

}).listen(1337,'127.0.0.1');
var rawJSON = loadXMLDoc(XMLPath);
function loadXMLDoc(filePath) {
    var json;
    try {
        var fileData = fs.readFileSync(filePath, 'ascii');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = JSON.stringify(result);
        });
        console.log("File '" + filePath + "/ was successfully read.\n");
        return json;
    } catch (ex) {console.log(ex)}
}

console.log(rawJSON);
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