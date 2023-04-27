import React, { useState } from 'react';
import { io } from "socket.io-client";
import Chat from './components/Chat';
import "./App.css";

const socket = io("ws://localhost:5000")

const App: React.FC = () => {

  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<number>(0);
  const [joinedRoom, setJoinedRoom] = useState<Boolean>(false);

  const handleJoinRoom = (): void => {
    if (username !== "" && room !== 0) {
      setJoinedRoom(true);
      socket.emit("join_room", room);
    } else {
      alert("username or room code cannot be empty");
    }
  }

  return (
    <div className='App'>
      <div className='joinChatContainer'>

        {!joinedRoom && <>
          <h4>Join Chat</h4>
          <input type='text' placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="number" placeholder="Room Code" onChange={(e) => setRoom(Number(e.target.value))} />
          <button onClick={handleJoinRoom}>Join Room</button>
        </>}
        {joinedRoom && <Chat socket={socket} username={username} room={room} />}
      </div>
    </div>
  )
}

export default App