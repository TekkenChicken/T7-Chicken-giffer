const express = require('express')
const router = express.Router();
const rp = require('request-promise')

const app = express();

router.post('/cut', (req, res, next) => {
    const { fetchUrl, title, fetchMinutes, fetchSeconds, fetchLength, auth } = req.body;

    const options = {
        method: 'POST',
        url: 'https://api.gfycat.com/v1/gfycats',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        body: {
            fetchUrl,
            title,
            fetchMinutes,
            fetchSeconds,
            fetchLength
        },
        json: true,
    }
     return rp(options)
    .then(data => {
        console.log('this data here', data)
        res.json(data)
    })
    .catch(err => {
        console.log('error :(')
        res.json(err)
    })
})

router.get('/checkStatuses/:linkId', (req, res, next) => {
    console.log('checking link id', req.params.linkId)
    const options = {
        method: 'GET',
        url: `https://api.gfycat.com/v1/gfycats/fetch/status/${req.params.linkId}`,
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }
    return rp(options)
    .then(data => {
        console.log('checked status', data)
        return res.json(data)
    })
    .catch(err => {
        console.log('status error :(')
        res.json(err)
    })
})

app.use('/', router)

module.exports = router;