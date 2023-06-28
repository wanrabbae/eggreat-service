require('dotenv').config()
const express = require('express')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT

require('./config/db-conf')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Eggreat backend service started!!')
})

app.get('/test', (req, res) => {
    res.json({
        key: "values"
    })
})

app.listen(PORT, () => {
    console.log("Server started....");
})

module.exports = app;