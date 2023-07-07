import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT

import response from "./src/utils/response.js"

// Require API
import authRoutes from './src/routes/auth.routes.js'
import accountRoutes from './src/routes/accounts.routes.js'
import rekeningRoutes from './src/routes/rekening.routes.js'
import addressRoutes from './src/routes/address.routes.js'
import productRoutes from './src/routes/product.routes.js'
import cartRoutes from './src/routes/cart.routes.js'

import adminRoutes from './src/routes/admin/admin.routes.js'
import adminAuthRoutes from './src/routes/admin/auth.routes.js'

import './config/db-conf.js'

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Eggreat backend service started!!')
})

app.use(response)
app.use('/api', authRoutes, accountRoutes, rekeningRoutes, addressRoutes, productRoutes, cartRoutes)
app.use('/api/admin', adminRoutes, adminAuthRoutes)

app.use('*', (req, res) => {
    res.errorNotFound('Not Found')
})

app.listen(PORT, () => {
    console.log("Server started....");
})

export default app;