import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

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
    const [messageList, setMessageList] = useState<messageInterface[]>([]);

    const sendMessage = async (): Promise<void> => {
        if (currentMessage !== "") {
            const messageData: messageInterface = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList([...messageList, messageData]);
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("recieve_message", (data:any):void => {
            console.log(data);
            setMessageList([...messageList, data]);
        })
    }, [socket, messageList])

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                {messageList.map((message) => {
                    return (<div className='message' id={username===message.author?"you":"other"}>
                        <div>
                            <div className='message-content'>
                                <p>{message.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p id='time'>{message.time}</p>
                                <p id='author'>{message.author}</p>
                            </div>
                        </div>
                    </div>)
                })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input style={{height: "60%", border: "0px"}} type="text" placeholder='Hey!' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
