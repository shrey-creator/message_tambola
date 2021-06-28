const express =require('express');
const app =express();
var path = require('path');
const socket=require('socket.io');

app.use(express.static('join'));
app.use(express.static('room'));
app.use(express.static('board'));
app.use(express.static('slip'));
app.use(express.static('chat'));
// app.get('/chat', function(req, res) {
//     res.sendFile(path.join(__dirname , './chat/chat.html'));
// });
app.get('/sitemap', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'sitemap.xml'));
});
var rooms=new Map();
var passedNumber=[];
var number=[];
var server=app.listen((process.env.PORT || 5000),()=>{console.log("app started on localhost 5000")});
var io=socket(server);
io.on('connection',(socket)=>{  
    var currentRoom;
   console.log('user connected ');

    socket.on('join',({room,type})=>{
        console.log(type);
        if(!(rooms.get(room)))
        {
            rooms.set(room,1);
        }
        else{
            np=rooms.get(room);
            rooms.set(room,np+1);
        }
        console.log(rooms);
        currentRoom=room;
       // console.log(number);
        passedNumber=[];
        for( i=0;i<number.length;i++)
        {           if(number[i].room === room)
                    {
                        passedNumber.push(number[i].ran);
                    }
        }
       
        socket.join(room);
       socket.emit('join',passedNumber);

    });
    

    socket.on('number',(data)=>{
        number.push(data);
        
    
        io.to(data.room).emit('number',data);
    });


    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });


    socket.on('disconnect', () => {
         usersLeft=rooms.get(currentRoom);
         if(usersLeft-1==0)
         {
             console.log(currentRoom);
             rooms.delete(currentRoom);
             end=number.length;
             i=0;
             while( i<end)
        {           if(number[i].room === currentRoom)
                    {
                        number.splice(i,1);
                        i--;
                    }
                    end=number.length;
                    i++;
        }
         }
         else{
             rooms.set(currentRoom,usersLeft-1);
         }
         console.log('user disconnected');

      });
    

})