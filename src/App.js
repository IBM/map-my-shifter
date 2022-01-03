import React from "react";
import "./app.scss";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Welcome from "./components/Welcome/Welcome";
import FrameFromSTIX from "./components/FromSTIX/FrameFromSTIX";
import FrameToSTIX from "./components/ToSTIX/FrameToSTIX";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={"bx--grid"} style={{ paddingTop: "3.5rem" }}>
          <Routes>
            <Route path="/from_stix" element={<FrameFromSTIX />} />
            <Route path="/to_stix" element={<FrameToSTIX />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
