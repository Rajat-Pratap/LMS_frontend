import React from "react";
import Footer from "./Components/FooterComponent";
import InstructorApp from "./Components/InstructorApp";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="page-container">
        <Router>
          <div className="content">
            <InstructorApp />
          </div>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}
export default App;
