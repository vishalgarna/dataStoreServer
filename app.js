require('./db.config')
require('./Websocketservices/websocketServices')
// const { errorhandling } = require('./erorHandling')
const express = require('express')

const app = express();
const bodyParser = require('body-parser');
const { router } = require('./router');

const port = process.env.PORT || 2004

app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(router)

app.get('/', (req, res) => {

    res.send('store data server :)').status(200)
})

app.get('*', (req, res) => {
    res.send('Sorry Aaapo Yaha Kuch Nahi milega !').status(401)
})




app.listen(port, () => {
    console.log(`Server is running ${port}`);
})



// git commit --amend --no-edit
// git push --force
