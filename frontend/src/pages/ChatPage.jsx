// ChatPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addMessage, setMessageHistory } from "../features/chats/ChatSlice"
import MessageItem from "../components/chat/MessageItem"

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("messageHistory", (history) => dispatch(setMessageHistory(history)));
    socket.on("receiveMessage", (newMessage) => dispatch(addMessage(newMessage)));
    return () => socket.disconnect(); // Cleanup
  }, [dispatch]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("sendMessage", newMessage);
      dispatch(addMessage(newMessage));
      setMessage("");
    }
  }, [message, dispatch]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>
      <div className="border p-2 mb-4 h-64 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="p-2 border rounded w-full mb-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default ChatPage;
