require('dotenv').config()
const express = require('express')

const app = express()
const PORT = 5000 || process.env.PORT

require('./config/db-conf')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Eggreat backend service started!!')
})
console.log("TEST CI/CD!!!");
app.listen(PORT, () => {
    console.log("Server started....");
})

module.exports = app;