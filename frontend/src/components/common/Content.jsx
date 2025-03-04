// src/components/common/Content.jsx
import React from "react";

const Content = () => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-lg font-medium">Welcome!</h2>
      <p>This header background changes based on theme  selection.</p>
    </div>
  );
};

export default Content;