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

router.get('/:class_id', async (req, res, next) => {
    try {
        const theClass = await Classes.findById(req.params.class_id)
        res.status(200).json(theClass)
    } catch(err){
        next(err)
    }
})

module.exports = router
