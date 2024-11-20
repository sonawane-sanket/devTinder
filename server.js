const express = require('express');

const app = express();

// app.use((req, res) => {
//     res.send('Hello from server')
// })

app.use('/', function (_, res) {
    res.send('Namaste form Dashboard!')
  })
  
app.use('/test', function (_, res) {
    res.send('This from test route')
})

app.use('/hello', function (_, res) {
    res.send('This from hello route')
})

app.listen(7777, () => {
    console.log('Server is runnning on port 7777...')
})