"use strict";

/**
 * @author lmiguelmh
 * @since 22/10/2019
 * */

const https = require('https');

class FaceMatcherAPI {

    constructor(url) {
        this.url = url;
    }

    enrol(face) {
        if (!face || !face.id || !face.image) {
            console.log(`enrolFace IllegalArgument`, face);
            throw new Error('IllegalArgument');
        }

        return new Promise((resolve, reject) => {
            const data = JSON.stringify(face);
            // https://u697b9z2k8.execute-api.us-east-1.amazonaws.com/latest/enrol
            const options = {
                hostname: 'u697b9z2k8.execute-api.us-east-1.amazonaws.com',
                port: 443,
                path: '/latest/enrol',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": data.length
                }
            };
            this._post(data, options, resolve, reject);
        });
    }

    search(face) {
        if (!face || !face.image) {
            console.log(`searchFace IllegalArgument`, face);
            throw new Error('IllegalArgument');
        }

        return new Promise((resolve, reject) => {
            const data = JSON.stringify(face);
            // https://u697b9z2k8.execute-api.us-east-1.amazonaws.com/latest/enrol
            const options = {
                hostname: 'u697b9z2k8.execute-api.us-east-1.amazonaws.com',
                port: 443,
                path: '/latest/search',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": data.length
                }
            };
            this._post(data, options, resolve, reject);
        });
    }

    _post(data, options, resolve, reject) {
        // create the request object with the callback with the result
        // const req = https.request(this.url, options, (res) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf-8');

            let response = '';
            res.on('data', function (data) {
                response += data;
            });
            res.on('end', function () {
                console.log(response);
                let responseObject = JSON.parse(response);
                resolve(responseObject);
            });
            resolve(JSON.stringify(res.statusCode));
        });

        // handle the possible errors
        req.on('error', (e) => {
            reject(e.message);
        });

        //do the request
        // req.write(JSON.stringify(data));
        req.write(data);

        //finish the request
        req.end();
    }
}

global.FaceMatcherAPI = FaceMatcherAPI;
// module.exports = FaceMatcherAPI;
