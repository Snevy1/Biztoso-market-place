import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

// Lazy load the components
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ListingsPage = lazy(() => import("./pages/ListingsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;