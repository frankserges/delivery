const http = require('http');
const app = require('./app/app');
const path = require("path");
const cors = require('cors');
const Delivery = require('./app/models/delivery');
let ObjectId = require('mongodb').ObjectId;

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
server.listen(port);
server.on('error', errorHandler);
server.on('listening', () => { 
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    // console.log(address)
    console.log('Listening on ' + bind);
    console.log('Launch Here ! ' + 'http://localhost:' + port + '/');
});

const io = require('socket.io')(server, {
    // includes local domain to avoid CORS error locally

    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true,
})

io.on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id)
    socket.on('location_changed', (data) => {
        console.log('Received location_changed message:', data);
        Delivery.updateOne({delivery_id:data.id},{location: data.loc})
        .then((res) => {
            // console.log(res);
           
        });
        // console.log(socket);
        
      });
      
      socket.on("status_changed", (data) => {
        console.log('Received status_changed message:', data);
        if(data.status == "picked-up")
        {
            Delivery.updateOne({delivery_id:data.id},{status: data.status, pickup_time: Date.now()})
            .then((res) => {
                // console.log(res);
                
            });
        }
        else if(data.status == "in-transit")
        {
            Delivery.updateOne({delivery_id:data.id},{status: data.status, start_time : Date.now()})
            .then((res) => {
                // console.log(res);
                
            });
        }
        else if(data.status == "delivered" || data.status == "failed")
        {
            Delivery.updateOne({delivery_id:data.id},{status: data.status, end_time  : Date.now()})
            .then((res) => {
                // console.log(res);
                
            });
        }

    })

    socket.on("disconnect", () => {
        // console.log("socket.io: User disconnected: ", socket.id)
    })
})
io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});


// server.listen(port);

const mongoose = require('mongoose');

const ONLINE_DB = process.env.ONLINE_DB || '';


mongoose.connect(ONLINE_DB)
    .then(() => console.log('Connection à MongoDB réussie !'))
    .catch((error) => console.log('Connection à MongoDB échouée ! \n' + error));
    console.log("Udel#####");
    const connection = mongoose.connection
    connection.once("open", () => {


        console.log("Setting change streams")
        // console.log(connection.collection());

        const packages = connection.collection("packages").watch({
            fullDocument: 'updateLookup'
        })
        const delivery = connection.collection("deliveries").watch({
            fullDocument: 'updateLookup'
        })
        

        delivery.on("change",(change) => {
            switch(change.operationType){
                case "update":
                    const  currDate = new Date();
                    const Udel = { ...change.fullDocument};
                    console.log("Udel###1##");

                    Delivery.findOne({
                        _id: Udel._id
                    })
                    .then((data) =>{
                        console.log(data)
                        io.emit("delivery_updated", Udel);
                        // res.status(200).json({
                        //     message: 'the modification have been done successfully !',
                        //     data: data
                        // })
                    })
                    // .catch(error => res.status(500).json({error}))
                        
                    ;
                   
                    
                    break;
            }

        })

    
    })    