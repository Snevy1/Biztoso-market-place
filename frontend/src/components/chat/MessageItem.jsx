// MessageItem.jsx
import React from "react";

const MessageItem = React.memo(({ message }) => (
  <div className="mb-2">
    <span className="font-semibold">{message.sender}: </span>
    <span>{message.text}</span>
    <span className="text-gray-500 text-xs ml-2">{message.timestamp}</span>
  </div>
));

export default MessageItem;
