# 🛒 Biztoso Marketplace Application

**Developed by:** Nevily Simiyu  
**Contact:** [simiyunevily@gmail.com](mailto:simiyunevily@gmail.com)  
**LinkedIn:** [Nevily Simiyu](https://www.linkedin.com/in/nevily-simiyu/)

---

## 🌟 **Project Overview**

The **Biztoso Marketplace** is a comprehensive full-stack application that combines **marketplace listings**, **real-time chat**, and **user profile management** into a cohesive and user-friendly platform. This project was developed as part of a **React Developer Assessment** to demonstrate **advanced React concepts**, **backend integration**, and **performance optimization**.

---

## 🎯 **Key Features and Requirements Implemented**

### 1. **Marketplace Listings 🛍️**
- **CRUD Functionality:** Users can **create**, **view**, **update**, and **delete** listings.
- **Multiple Image Uploads:** Supports **multiple images per listing** with **previews**.
- **Client-Side Validation:** Using **React Hook Form** for **form validation**.
- **Image Display:** Listings display their **associated images**, **name**, and **price** in a **responsive grid**.

### 2. **Real-Time Messaging 💬**
- **WebSocket Integration:** Built using **Socket.IO** to enable **real-time chat**.
- **Error Handling:** Manages **network interruptions** and ensures **smooth messaging**.
- **Responsive UI:** Chat interface supports **simultaneous messages** and **dynamic updates**.

### 3. **Profile Management 👤**
- **Profile Form:** Allows **profile creation and editing** with **image uploads**.
- **State Management:** Utilizes **Redux Toolkit** for **centralized state management**.
- **Optimized Input Handling:** Custom **image input** with **preview and reset options**.

### 4. **Advanced React Concepts 🚀**
- **Custom Hooks:** `useFetch` and `useFilteredLeads` for **data fetching** and **filtering**.
- **React Context API:** For **theme management** (light/dark mode).
- **Code Splitting & Lazy Loading:** Implemented with **React Router** to **optimize performance**.
- **Performance Optimizations:** Utilized **React.memo**, **useCallback**, and **useEffect** **cleanup**.

### 5. **Theme Management 🌗**
- **Dark/Light Mode Toggle:** Fully functional **theme switcher** with **smooth transitions**.
- **Persistent Theme State:** Saves the **user's theme preference** using **localStorage**.

### 6. **UI & UX Enhancements 🎨**
- **Home Page Navigation:** Provides easy access to **Listings**, **Chat**, and **Profile** pages.
- **Consistent Styling:** Styled with **Tailwind CSS** for a **modern and responsive** design.
- **Dynamic Components:** Integrated **lucide-react** icons for better **visual feedback**.

---

## 🚦 **Project Architecture & Code Quality**

- **Modular Architecture:** Clear separation of **components**, **hooks**, **context providers**, and **Redux slices**.
- **Reusable Components:** Created components like **ImageInput**, **ThemeToggle**, and **MessageItem** to **reduce redundancy**.
- **Folder Structure:**
**KEY POINTS**
 - This folder structure misses some files, I haven't included everything, it's just an overview
 
biztoso-marketplace/
├── backend/                      # Backend server and API
│   ├── uploads/                  # Directory for uploaded images
│   ├── server.js                 # Main server file (Express.js)
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables
│
├── frontend/                     # Frontend application
│   ├── public/                   # Static files
│   │   ├
│   │   └── favicon.ico           # Favicon
│   │
│   ├── src/                      # Source code for React app
│   │   ├── assets/               # Images, icons, and other assets
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/           # Common input components (ImageInput, SubmitButton)
│   │   │   ├── chat/           # chat components
│   │   │   ├── Layout.jsx        # Layout component with routing
│   │   │   └
│   │   │
│   │   ├── context/              # React context providers
│   │   │   └── ThemeContext.js   # Dark/Light mode context
│   │   │
│   │   ├── features/             # Redux slices
│   │   │   ├── listings/         # Listings slice
│   │   │   │   └── ListingSlice.js
│   │   │   └── leads/            # Leads slice
│   │   │       └── LeadsSlice.js
│   │   │
│   │   ├── hooks/                # Custom hooks
│   │   │   ├
│   │   │   └── useFilter.js      # Filtering leads by status
│   │   │
│   │   ├── pages/                # Main application pages
│   │   │   ├── HomePage.jsx      # Home page with navigation links
│   │   │   ├── ListingsPage.jsx  # Marketplace listings
│   │   │   ├── ProfilePage.jsx   # User profile management
│   │   │   └── ChatPage.jsx      # Real-time chat
│   │   │
│   │   ├── redux-store/          # Redux store configuration
│   │   │   └── store.js          # Main store setup
│   │   │
│   │   ├── services/             # API service functions
│   │   │   
│   │   │   
│   │   │
│   │   ├── styles/               # Global and component styles
│   │   │   └── globals.css         # Tailwind and global styles
│   │   │
│   │   ├── utils/               
│   │   │
│   │   ├── App.jsx               # Main React component
│   │   ├── index.js              # Application entry point
│   │   ├── 
│   │   ├── vite.config.js        # Vite configuration
│   │   └── package.json          # Frontend dependencies
│   │
│   └── .env                      # Frontend environment variables
│
├── README.md                     # Project overview and instructions
└── package.json                  # Root dependencies (if needed)









---

## ⚙️ **Tech Stack**

### Frontend:
- **React** with **Vite** for **fast development**.
- **Tailwind CSS** for **styling**.
- **React Router** for **navigation**.
- **Socket.IO Client** for **real-time chat**.
- **Redux Toolkit** for **state management**.
- **ContextAPI** for **Lightweight state management like theme**

### Backend:
- **Node.js** & **Express.js** with a **RESTful API**.
- **Mock Server** with **JSON Server** for **listings and leads data**.

---

## 💻 **Installation & Setup**

### 1. **Clone the Repository:**
```bash
git clone https://github.com/yourusername/biztoso-marketplace.git
cd Biztoso-market-place
cd frontend
Run npm install
startfrontend npm run dev
# Frontend runs on http://localhost:5173
cd backend
Run npm install
npm run dev
# Backend runs on http://localhost:5000

```


**How to Use***

Home Page: Navigate between Listings, Chat, and Profile pages using the intuitive UI.
Marketplace: Add, edit, and delete listings with image support.
Chat Module: Experience real-time messaging with dynamic updates.
Profile Management: Create and edit your profile with image uploads.
Theme Toggle: Switch between light and dark modes using the toggle button.


Challenges & Solutions
1. Real-Time Messaging:
Challenge: Handling network interruptions in Socket.IO.
Solution: Implemented reconnection logic and error handling.
2. Form Handling:
Challenge: Managing image previews and form resets.
Solution: Created a custom ImageInput component and used React Hook Form.
3. Theme Management:
Challenge: Ensuring smooth transitions between dark/light modes.
Solution: Utilized React Context API and localStorage for theme persistence.
🚀 Additional Features (Optional)
Code Splitting: All pages are lazily loaded, improving initial load times.
Custom Hooks: useFetch for API calls and useFilteredLeads for dynamic filtering.
UI Enhancements: Hover effects, responsive cards, and dynamic icons.
🛠 Future Improvements
Implement advanced state management using Redux Async Thunks.
Enhance real-time chat with typing indicators and message read status.
Introduce advanced filtering and sorting options in the listings page.

Feedback & Contact
I hope you enjoy exploring the Biztoso Marketplace Application. I am open to feedback and suggestions. Feel free to reach out via email or LinkedIn. Thank you for your time and consideration!




