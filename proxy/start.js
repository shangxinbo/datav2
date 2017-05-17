process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const express = require('express')
const path = require('path')
const glob = require('glob')
const bodyParser = require('body-parser')
const proxy_port = require('../config/dev.env').MOCK_SERVER_PORT
const app = express()
const request = require('request').defaults({ baseUrl: 'https://datav.geotmt.com' })
const crypto = require('crypto')
const fs = require('fs')

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex')
}

let cookieTokenJar = request.jar()
let cookieSetOver = false
request.post({
    url: '/gmanager/background/loginCheck.html',
    form: {
        userName: 'shangxinbo',
        pwdplain: 'sxb123456',
        password: md5('sxb123456')
    }
}, function (err, httpResponse, body) {
    let cookieStr = httpResponse.headers['set-cookie'][0].split(';')[0].split('=')[1]
    let cookie = request.cookie('JSESSIONID=' + cookieStr)
    cookieTokenJar.setCookie(httpResponse.headers['set-cookie'][0], 'https://datav.geotmt.com/gmanager/background/index.html', function () {
        cookieSetOver = true
    })
})

let API = {
    '/api/timeline': '/gmanager/background/report/getMoneyTimeJson.html',
    '/api/force_direct': '/gmanager/background/report/getTagMap.html',
    '/api/speed': '/gmanager/background/report/getAccountCount.html',
    '/api/data_in': '/gmanager/background/report/getAccountDayCount.html',
    '/api/data_off': '/gmanager/background/report/getConsumeJson.html',
    '/api/user_time': '/gmanager/background/report/getUserTimeJson.html',
    '/api/chord': null,
    '/api/area_user': '/gmanager/background/report/getCityStatJson.html',
    '/api/map_user': '/gmanager/background/report/getMapUserJson.html',
    '/api/total_account': '/gmanager/background/report/getUserstaticsJson.html',
    '/api/video_data': '/gmanager/background/report/getAccountOverviewJson.html',
    '/api/yanzhen': '/yanzhen-screen/yanzhen/index/total/datainfo'
}

function cacheData(dir,body) {
    fs.open(path.join(__dirname, '..' + dir + '.json'), 'w', function (err, fd) {
        if (err) {
            return console.error(err)
        }
        fs.writeFile(path.join(__dirname, '..' + dir + '.json'), body, function (err) {
            if (err) {
                return console.log(err)
            } else {
                console.log('request success: ' + dir)
            }
        })
    })
}


app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(function (req, res, next) {
        if (req.path.indexOf('/api') >= 0) {
            if (API[req.path] == null) {
                getLocalData()
            } else {
                request({ url: API[req.path], qs: req.query, jar: cookieTokenJar }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        try {
                            let data = JSON.parse(body)
                            res.json(data)
                        } catch (err) {
                            getLocalData()
                        }
                        let dir = req.path,norm = body
                        //cacheData(dir,norm)
                    } else {
                        getLocalData()
                    }
                })
            }
        } else {
            res.send('')
        }

        function getLocalData() {
            var file = glob.sync(path.join(__dirname, '..' + req.path + '.json'))[0]
            if (file) {
                let data = require(file)
                res.json(data)
            } else {
                res.send('error')
            }
        }
    })

app.listen(proxy_port)
