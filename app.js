import express from 'express'
import { CategoryModel } from './db.js' 
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors' // need to install  npm i cors


// db and model stuff are in db.js, it is more clean.  This file is for express.
// it's a router pass, express. express = app. sth
const app = express()
// const port = 4001

// must be do this after const the express and port.
app.use(cors())

//  it must do this request before doing the route(app.get)
app.use(express.json()) //'use' request handler > request json

app.get('/', (request, response) => response.send({ info: 'Journal API 2023' })) //callback function: request and response, 

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoutes)

// app.listen(port, () => console.log(`App running at http://localhost:${port}/`))   //listen = callback a server

export default app
