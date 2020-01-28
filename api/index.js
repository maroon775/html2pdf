const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

const allowedOrigins = [
    'https://shadowbox-utils.local:8002',
    'https://localhost:8002',
    //without https
    'http://shadowbox-utils.local:8002',
    'http://localhost:8002',
];

app.use(cors({
    origin: allowedOrigins,
//    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//    allowedHeaders
}));
app.use(express.json());

const responseDivider = {
    start: (req, res, next) => {console.log('+'.repeat(100)), next();},
    end: (req, res, next) => {console.log('='.repeat(100)), next();}
};

app.get('/hl7-get-list',
        responseDivider.start,
        (req, res, next) => {
            console.log(req.url);
            request({
                url: 'https://portal.shadowbox.solutions/api/hl7-get-list',
            }, (err, response, body) => {
                if(err) {
                    return res.status(500).send({message: err});
                }
                res.send(body);
                next();
            });
        },
        responseDivider.end
    )
    .post('/hl7-get-by-id',
        responseDivider.start,
        (req, res, next) => {
            console.log(new Date().getMilliseconds(),{
                url: req.url,
                params:req.params,
                body: req.body,
            });
            
            let jsonData = {};
            if(req.body && req.body.object) {
                jsonData = req.body;
            }
            
            request({
                url: 'https://portal.shadowbox.solutions/api/hl7-get-by-id',
                json: jsonData,
                method: 'POST'
            }, (err, response, body) => {
                if(err) {
                    return res.status(500).send({message: err});
                }
                
                res.send(body);
                next();
            });
        },
        responseDivider.end
    );


app.post('/api/security/login',
    responseDivider.start,
    (req, res, next) => {
        console.log(new Date().getMilliseconds(),{
            url: req.url,
            params:req.params,
            body: req.body,
        });
        
        let jsonData = {};
        if(req.body && req.body.object && req.body.commandName === 'security_login') {
            jsonData = req.body;
        }
        else {
            return res.status(500).send({message: 'Bad request!'});
        }
        
        request({
            url: 'https://auth.shadowbox.solutions/api/security/login',
            json: jsonData,
            method: 'POST'
        }, (err, response, body) => {
            if(err) {
                return res.status(500).send({message: err});
            }
            
            res.send(body);
            next();
        });
    },
    responseDivider.end
);

app.listen(3333, function() {
    console.log('Example app listening on port 3333!');
});
