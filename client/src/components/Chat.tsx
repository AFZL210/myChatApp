import React, { useState } from 'react'
import { Socket } from 'socket.io-client'

interface Props {
    socket: Socket
    username: string
    room: number
}

interface messageInterface {
    room: number
    author: string
    message: string
    time: any
}

const Chat: React.FC<Props> = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState<string>("");

    const sendMessage = async (): Promise<void> => {
        if (currentMessage !== "") {
            const messageData: messageInterface = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
        }
    }

    return (
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'></div>
            <div className='chat-footer'>
                <input type="text" placeholder='Hey!' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat