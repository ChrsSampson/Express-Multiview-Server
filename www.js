const app = require('./app')
const mongoose = require('mongoose')

const config = require('dotenv').config

config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server listening on ${process.env.PORT}`)
})