
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./CreateChat"
import TextField from "@mui/material/TextField";
import {useEffect} from 'react'
import Button from '@mui/material/Button'
const socket = io.connect("http://localhost:7000");

function Room() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
 

 useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("userInfo"))
  setUsername(user.fullName)
 },[])
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
         
          <br />
          <TextField
            type="text"
            label="enter room id to join a chat..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            style={{width:"300px"}}
          />
          <Button variant='contained' onClick={joinRoom} style={{marginLeft:"30px"}}>Join A Room</Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Room;


