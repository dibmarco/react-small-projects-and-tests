import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello</h1>
        <ul>
          <li>
            <NavLink to="/">Page 1</NavLink>
          </li>
          <li>
            <NavLink to="/page-2">Page 2</NavLink>
          </li>
          <li>
            <NavLink to="/page-3">Page 3</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page-2" element={<Page2 />} />
          <Route path="/page-3" element={<Page3 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  return <p>Home Page</p>;
}

function Page2() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Page 2</h2>
      <p className="back" onClick={() => navigate(-1)}>
        Back
      </p>
    </>
  );
}

function Page3() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Page 3</h2>
      <p className="back" onClick={() => navigate("/")}>
        Back
      </p>
    </>
  );
}

export default App;
