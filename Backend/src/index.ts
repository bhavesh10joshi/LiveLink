import {WebSocketServer , WebSocket} from 'ws'

let UserCount = 0;

const wss = new WebSocketServer({port : 8080});
let Users : WebSocket[] = [];

wss.on("connection" , function(socket)
{
    UserCount = UserCount + 1;
    Users.push(socket);
    console.log("User Connected to the Server are #" + UserCount);

    socket.on("message" , function(message)
    {
        console.log("The message recieved is " + message.toString());
        for(let i = 0 ; i<Users.length ; i++)
        {
            Users[i]?.send("Message Sent by one of the user is " + message.toString());
        }
    }); 
    socket.on("close" , function()
    {
        Users = Users.filter(i => i != socket);
        console.log("Users DisConnected in the array is " + Users.length);
    }) ;
});