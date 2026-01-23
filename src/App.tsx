import "./App.css";
import { Book } from "./components/Book";

function App() {
  return (
    <div className="app-container">
      <div>
        <p className="initial-text">THIS IS MY BOOK REACT</p>
      </div>
      <div className="book-container">
        <Book />
      </div>
    </div>
  );
}

export default App;
