app = require "./app.coffee"

app.set 'port', process.env.PORT or 8888

server = app.listen app.get('port'), ->
    console.log 'Express server listening on port ' + server.address().port
