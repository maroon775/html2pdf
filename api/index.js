const express = require('express');
const cors = require('cors');
const request = require('request');
const webpackConfig = require('../webpack.config');
const app = express();

const webpackFrontAppPort = webpackConfig.devServer.port ? ':' + webpackConfig.devServer.port : '';
const allowedOrigins = [
    `http://${webpackConfig.devServer.host}${webpackFrontAppPort}`,
    ...(webpackConfig.devServer.allowedHosts.map(host => `http://${host}${webpackFrontAppPort}`) || [])
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

app.listen(3333, function() {
    console.log('Example app listening on port 3333!');
});
