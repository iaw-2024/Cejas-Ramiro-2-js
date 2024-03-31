const express = require("express");
const app = express();
const request = require('request');

var url = "https://6602f3169d7276a75554ac7b.mockapi.io/apiIAW/Songs";
var listOfUsers = [];

function createHTML(listOfUsers){
    var html = "<html><head><title>Users</title></head><body>";
    html += "<h1>Users</h1>";
    html += "<table border='1'>";
    html += "<tr><th>ID</th><th>Name</th><th>Avatar</th></tr>";
    for(var i = 0; i < listOfUsers.length; i++){
        html += "<tr>";
        html += "<td>"+listOfUsers[i].id+"</td>";
        html += "<td>"+listOfUsers[i].name+"</td>";
        html += "<td><img src='"+listOfUsers[i].avatar+"'></td>";
        html += "</tr>";
    }
    html += "</table>";
    html += "</body></html>";
    return html;
}

function setUp(){
    //call the api and get the list of users
    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        listOfUsers = body;
    });
}

app.get("/express", (req, res) => {
    var htmlToSend = createHTML(listOfUsers);
    res.send(htmlToSend);
});

app.get("/consulta_cliente_servidor", (req, res) => {
    res.send(listOfUsers);
});

app.use(express.static('public'))
app.use(express.json());

setUp();
app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;