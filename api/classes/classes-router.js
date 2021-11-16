const express = require('express')
const router = express.Router()
const Classes = require('./classes-model')
const { restricted } = require("./../auth/auth-middleware")

router.get('/', async (req, res, next) => {
    try {
        const classes = await Classes.findAll()
        res.status(200).json(classes)
    } catch(err){
        next(err)
    }
})

module.exports = router
