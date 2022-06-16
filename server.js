const express = require("express")
var cors = require('cors')
const sendMail = require("./mailSend");
var bodyParser = require('body-parser');
var app = express();

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-type', 'Authorization', 'Origin', 'Access-Control-Allow-Origin', 'Accept', 'Options', 'X-Requested-With']
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


app.post("/send_mail", function (request, response) {
    console.log("request=====>>>>", request.body);
    // ?phone=${request.body?.phone}
    sendMail(request.body?.email, `http://localhost:3000/user/setPassword?key=${request.body?.userID}`)
    response.send("Hello World!")
})
app.listen(3007, () => {
    console.log("Started application on port %d", 3007)
});