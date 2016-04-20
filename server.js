/**
 * Created by fReDDy on 13.04.2016.
 */
var fs = require('fs'),
    http=require('http'),
    parseString = require('xml2js').parseString,
    js2xmlparser=require('js2xmlparser'),
    currentPage;
    ejs = require('ejs');
renderCurrentPage();
http.createServer(function (req, res) {
    if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(currentPage);
    }
    else if (req.url == '/saveXML')
    {
        var incomeJSON;
        req.on('data',function(data){
            incomeJSON=data.toString();
            if (incomeJSON == "[]")
            res.end("ай ай ай дружок, че ты мне пустые данные то шлешь?");
        })
        req.on('end',function(){
            if (incomeJSON != "[]") {
                var newXML = js2xmlparser("Parameters", {Parameter: JSON.parse(incomeJSON)});
                fs.writeFile(__dirname + '/xml/input.xml', newXML, function (err) {
                    if (err) {
                        res.end("что то пошло не так");
                        console.log(err);
                    } else {
                        res.end("Успех");
                        renderCurrentPage();
                        console.log("Файл сохранен.");
                    }
                });
            }
            else res.end("ай ай ай дружок, че ты мне пустые данные то шлешь?");
        })
    }
    else if (req.url == '/client.js') {
        fs.readFile('js/client.js', function (err, js) {
            if (err) {
                throw err;
            }
            res.end(js);
        })
    }
    else {
        console.log(req.url);
        res.writeHead(200, {"Content-Type": 'text/html'});
        res.end("Дружок, чет ты заблудился походу, такого адреса не существует!");
    }

//}).listen(process.env.PORT);
}).listen(1337,'127.0.0.1');
function renderCurrentPage() {
    fs.readFile(__dirname + '/xml/input.xml', function(err, data) {
        parseString(data, function (err, result) {
            try {
                result = result.Parameters.Parameter;
            } catch(err) {
                getCurrentException("Некорректные данные в input.xml", err);
                return;
            }

            fs.readFile(__dirname +'/js/html.ejs', 'utf-8', function(error, content) {
                if (error) {
                    getCurrentException("Ошибка при чтении html.ejs", error);
                    return;
                }

                try {
                    currentPage = ejs.render(content, {table: result}, {delimiter: '?'});
                } catch(err) {
                    getCurrentException("Ошибка при рендеринге. Проверьте правильность передаваемых данных в html.ejs", err);
                }
            });
        });
    });
}

function getCurrentException(mes, err) {
    currentPage = "Что-то пошло не так, братан!";
    console.log("------------------------------------------------------------------------------------");
    console.log(mes);
    console.log(err);
    console.log("------------------------------------------------------------------------------------");
}