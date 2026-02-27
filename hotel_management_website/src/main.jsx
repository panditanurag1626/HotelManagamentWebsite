import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Base from "./components/Base.jsx";
import Home from "./components/Home.jsx";
import Hotel from "./components/Hotel.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Booking from "./components/Booking.jsx";
import Contact from "./components/Contact.jsx";
import Rooms from "./components/Rooms.jsx";
import Stay from "./components/Stay.jsx";
import Dining from "./components/Dining.jsx";
import Service from "./components/service.jsx";
import Order from "./components/Order.jsx";
import Edit from "./components/Edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "hotel", element: <Hotel /> },
      { path: "booking", element: <Booking /> },
      { path: "login", element: <Login /> },
      { path: "contact", element: <Contact /> },
      { path: "rooms", element: <Rooms /> },
      { path: "stay", element: <Stay /> },
      { path: "dining", element: <Dining /> },
      { path: "service", element: <Service /> },
      { path: "order", element: <Order /> },
      { path: "edit", element: <Edit /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);