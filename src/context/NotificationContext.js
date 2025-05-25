import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const navigate = useNavigate();
  
  

  const socket = io("https://backendhost-production-1804.up.railway.app/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (userId) {
      socket.emit("join", `user_${userId}`);
    }   

    const handleNewOrder = (data) => {
      
      if (Notification.permission === "granted") {
        
      }

      console.log("Notification received: ", data);
      
      
    };

    const handleLowStock = (data)=> {
      if (Notification.permission === "granted") {
        const notification = new Notification("Low Stock Alert", {
          body: `Product ${data.productName} is running low on stock.`,
          icon: "/path/to/icon.png" // Replace with your icon path
        });

        notification.onclick = () => {
          navigate("/products");
        };

      }

      console.log("Notification received: ", data);
    }


    // Register the event listener
    socket.on("new-order", handleNewOrder);
    socket.on("low-stock", handleLowStock);

    // Cleanup: Remove the event listener to prevent duplicates
    return () => {
      socket.off("new-order", handleNewOrder);
      socket.off("low-stock", handleLowStock)
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications}}>
      {children}
    </NotificationContext.Provider>
  );
};