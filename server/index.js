/**
 * Created by fReDDy on 13.04.2016.
 */
var fs = require('fs'),
    http=require('http'),
    xml2js = require('xml2js'),
    ejs = require('ejs');
http.createServer(function (req, res) {
    console.log(req.url);
    console.log("нихуя пришел запрос");
    if (req.url=='/') {
        fs.readFile('../js/html.ejs', 'utf-8', function (err, html) {
                if (err) {
                    throw err;
                }
            console.log("index.ejs was read successfully!");
            console.log(html);
                var table = loadXMLDoc("../xml/input.xml").Parameters.Parameter;
            console.log(table);
                res.writeHead(200,
                {'Content-Type': 'text/html; charset=utf-8'});
                 res.end(ejs.render(html, {table: table}, {delimiter: '?'}));
            }
        );
    }
    else if (req.url == '/getThatBitch') {
        console.log("таки мы здесь сучка!");
        res.url='http://127.0.0.1:1337/index.html';
        res.writeHead(200,{'Access-Control-Allow-Origin':'*'});
        console.log("нихуя запрос пришел");
        res.end(rawJSON);

    }
    else if (req.url == '/client.js')
    {
        fs.readFile('../js/client.js',function(err,js){
            if (err){
                throw err;
            }
            res.end(js);
        })
    }

}).listen(1337,'127.0.0.1');
function loadXMLDoc(filePath) {
    var json;
    try {
        var fileData = fs.readFileSync(filePath, 'ascii');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json =result;
        });
        console.log("File '" + filePath + "/ was successfully read.\n");
        return json;
    } catch (ex) {console.log(ex)}
}
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