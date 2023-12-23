import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/library">Another Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
