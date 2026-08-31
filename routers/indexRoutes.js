const { Router } = require('express')

const indexRoutes = Router()

indexRoutes.get('/', (req, res) => {
    res.send('helllo')
})

module.exports = { indexRoutes }