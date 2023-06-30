import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'

const app = express()
const PORT = process.env.PORT

import response from "./src/utils/response.js"

// Require API
import authRoutes from './src/routes/auth.routes.js'
import accountRoutes from './src/routes/accounts.routes.js'
import rekeningRoutes from './src/routes/rekening.routes.js'
import addressRoutes from './src/routes/address.routes.js'

import './config/db-conf.js'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Eggreat backend service started!!')
})

app.use(response)
app.use('/api', authRoutes, accountRoutes, rekeningRoutes, addressRoutes)

app.use('*', (req, res) => {
    res.errorNotFound('Not Found')
})

app.listen(PORT, () => {
    console.log("Server started....");
})

export default app;