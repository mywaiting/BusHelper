/**
 * Created by root on 15-1-21.
 */
var app = require("./app.js");

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'),function(){
        console.log('Express server listening on port ' + server.address().port)
    });