const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.send('test route son')
})

module.exports = router;