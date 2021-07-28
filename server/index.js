const express = require('express')

const app = express()

const request = require('request')

app.set('port', 3000)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/getplayersummary', (req, res) => {
    const qParams = []
    for (const p in req.query) {
        qParams.push({ 'name': p, 'value': req.query[p] })
    }

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=FE561FC69BCCD185BD198BC9C311AB60&steamids=${qParams[0].name}`
    request(url, (err, response, body) => {
        if (!err && response.statusCode < 400) {
            console.log(body)
            res.send(body)
        }
    })
})

app.use(function(req,res){
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.type('plain/text')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})