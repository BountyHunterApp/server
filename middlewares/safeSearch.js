const axios = require('axios')

module.exports = function (req, res, next) {
    let body = {
        "requests":[
            {
                "image":{
                    "source":{
                        "imageUri": req.file.cloudStoragePublicUrl
                    }
                },
                "features":[
                    {
                        "type":"SAFE_SEARCH_DETECTION"
                    }
                ]
            } 
        ]
    }
    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.SAFE_SEARCH_API_KEY}`, body)
    .then(data => {
        let result = data.data.responses[0].safeSearchAnnotation
        if (result.adult === 'LIKELY' || result.adult === 'VERY_LIKELY' || result.spoof === 'LIKELY' || result.spoof === 'VERY_LIKELY' || result.medical === 'LIKELY' || result.medical === 'VERY_LIKELY' || result.violence === 'LIKELY' || result.violence === 'VERY_LIKELY' || result.racy === 'LIKELY' || result.racy === 'VERY_LIKELY') {
            res.status(500).json({message: 'Inappropiate image'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
}