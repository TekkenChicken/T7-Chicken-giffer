const express = require('express')
const router = express.Router();
const rp = require('request-promise')

const app = express();

router.post('/cut', (req, res, next) => {
    const { fetchUrl, title, fetchMinutes, fetchSeconds, fetchLength, charName, auth } = req.body;

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
            fetchLength,
            tags: charName
        },
        json: true,
    }
     return rp(options)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log('error :(')
        res.json(err)
    })
})

router.get('/checkStatuses/:linkId', (req, res, next) => {
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
        return res.json(data)
    })
    .catch(err => {
        console.log('status error :(')
        res.json(err)
    })
})

router.delete('/delete/:linkId', (req, res, next) => {
    console.log('deleting gif', req.params.linkId)
    const options = {
        method: 'DELETE',
        url: `https://api.gfycat.com/v1/me/gfycats/${req.params.linkId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.body.Authorization
        },
        json: true
    }
    return rp(options)
    .then(data => { console.log('wtf man', res.json(data.statusMessage))
        return res.json(data)
    })
    .catch(err => {
        console.log('deletion error :L', res.json(err))
        res.json(err)
    })
})

router.get('/getAlbums', (req, res, next) => {
    const auth = req.headers.authorization;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth
        },
        url: `https://api.gfycat.com/v1/me/album-folders`,
        json: true
    }
    return rp(options)
    .then(data => {
        return res.json(data)
    })
    .catch(err => {
        console.log('failure', err.errorMessage)
        res.json(err)
    })
})

router.post('/createAlbum', (req, res, next) => {
    const { Authorization, charName } = req.body;

    console.log('show me auth', Authorization);
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
        url: `https://api.gfycat.com/v1/me/albums/2`,
        body: {
           folderName: charName, 
        },
        json: true
    }
    return rp(options)
    .then(data => { console.log('creating album data', data)
        return res.json(data)
    })
    .catch(err => {
        console.log(`couldn't create`, err.errorMessage)
        res.json(err)
    })
})

router.patch('/addGifToAlbum', (req, res, next) => {
    const { Authorization, action, albumId, gfycat } = req.body;
     const options = {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
             Authorization,
         },
         url: `https://api.gfycat.com/v1/me/albums/${albumId}`,
         body: {
             action: 'add_to_album',
             gfy_ids: gfycat,
         },
         json: true
     }

     console.log('options', options)
     return rp(options)
     .then(data => { console.log('adding gif to album', data)
        return res.json({status: 'success'})
    })
    .catch( err => {
        console.log('could not add gif to album', err.message)
        res.json(err.message)
    })
})

app.use('/', router)

module.exports = router;