var mysql = require('mysql2');
const express = require('express');
const http = require('http');
const path = require('path')
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var helmet = require('helmet');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());


app.post('/', (req, res) => {
    var username = req.body.user;
    var password = req.body.pass;

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root"
    });

    connection.connect((err) => {
        if (!err) {
            console.log("Connected!");

            connection.query('USE SIMPLELOGIN', (err, result) => {

                connection.query(`SELECT * FROM USERS WHERE USER='${username}' AND PASSWORD='${password}'`, (error, out) => {

                    if (out.length != 0) {
                        res.redirect(301, 'http://localhost:3000/');
                        console.log(out);
                    }
                    else {
                        res.send("Failed");
                        console.log(out);
                    }
                });
            });

        }
        else {
            console.log("Some Error");
            res.send("Connection Error");
        }
    });

})

server.listen(3150, () => {
    console.log("Server Started")
});
