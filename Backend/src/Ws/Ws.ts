import { WebSocketServer , WebSocket} from "ws";

//new connection 
const wss = new WebSocketServer({port : 8080});

//storing users
interface UserType {
    socket : WebSocket , 
    RoomNo : string
};
const Users : UserType[] = [];
//connection established
wss.on("connection" , function(socket){
    socket.on("message" , function(e)
    {
        const Message:any = JSON.stringify(e.toString());
        //users can join a room 
        if(Message.type == "join")
        {
            Users.push({
                socket : socket , 
                RoomNo : Message.payload.roomId
            });
        }//users can c761756699976175
        else if(Message.type === "chat")
        {
            let CurrentUserRoom = null;
            for(let i = 0 ; i<Users.length ; i++)
            {
                if(Users[i]?.socket === socket)
                {
                    CurrentUserRoom = Users[i]?.RoomNo;
                }
            }
            if(CurrentUserRoom != null)
            {
                for(let i = 0 ; i < Users.length ; i++)
                {
                    if(Users[i]?.RoomNo === CurrentUserRoom)
                    {   
                        socket.send(Message.payload.message);
                    }
                }
            }
        }
    });
});