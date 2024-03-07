import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import { StarRating } from "./StarRating";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} messages={["Terraible", "Bad", "Okay" , "Good", "Amazing"]}/>*/}

    {/* <StarRating size={25} color="red" />*/}
    <App />
  </React.StrictMode>
);
