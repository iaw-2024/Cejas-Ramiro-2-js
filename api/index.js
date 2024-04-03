const express = require("express");
const app = express();
const request = require('request');

var url = "https://6602f3169d7276a75554ac7b.mockapi.io/apiIAW/Songs";
var listOfUsers = [];

function createHTML(listOfUsers){
    var html = "<!Doctype html><html><head><meta charset=\"utf-8\"><title>Express</title><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\"></head><body><div class=\"container-sm\"><h1>DOM</h1><div class=\"list align-items-center\" id=\"list\">"
    for (var i = 0; i < listOfUsers.length; i++){
        html += "<div class=\"list-group-item list-group-item-action d-flex align-items-center\"><img src=\"" + listOfUsers[i].image + "\" style=\"width:100px; height:100px; margin-right: 10px; border-radius: 50%\">";
        {
            html += "<div class=\"w-100 justify-content-between inline-block\"><h1 style=\"marginBottom: 0\">" + listOfUsers[i].name + "</h1><br>"+ listOfUsers[i].author +"<br>"+ listOfUsers[i].studio +"<br>"+ listOfUsers[i].year +"</div></div>";
        }
    }
    html += "</div></div></body></html>";
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