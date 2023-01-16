import app from './app.js'


// when using railway for depolyment, add the port   || = if XXX , otherwise ||  YYY.
const port = process.env.PORT || 4001

app.listen(port, () => console.log(`App running at http://localhost:${port}/`))   //listen = callback a server


