const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/configViewEngine');
const configStaticResource = require('./configs/configStaticResource');
const configSession = require('./configs/configSession');
const { NotFound, HandleError } = require('./Middlewares/ErrorHandling');
const configPassport = require('./configs/configPassport');
const ConfigHttps = require('./configs/ConfigHttps');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();


//Config APP
const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
configSession(app);
configViewEngine(app, path.join(__dirname, 'views'));
configStaticResource(app, path.join(__dirname, 'public'));
configPassport(app);


//Router
app.use(require('./routes/redirectRouter'));
app.use(require('./routes/auth.r'));
app.use('/admin', require('./routes/admin.r'));
app.use('/customer', require('./routes/customer.r'));
app.use('/api', require('./routes/api.r'));

//MiddleWare
app.use(NotFound);
app.use(HandleError);

//Thiết lập https
const server = ConfigHttps(app, __dirname);

// socket
const io = require('socket.io')(server);
io.on('connection',socket => {
    socket.on('join',room => {
        socket.join(room);
    })
    socket.on('message',data => {
        const  {room,des,mss} = data;
        console.log(data)
        socket.to(des).emit('message',data);
    })
})


server.listen(port, () => {
    console.log(`Server is listening on port number: ${port}`);
})
