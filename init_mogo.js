const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => {
    console.log('mongodb grant connected')
})
.catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('mongodb connection established')
})

mongoose.connection.on('error', (err) =>{
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection disconnected')
})


process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})