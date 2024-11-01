import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
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
            <NavLink to="/page-2/123">Page 2</NavLink>
          </li>
          <li>
            <NavLink to="/page-3">Page 3</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page-2/:id" element={<Page2 />} />
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
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <p>Page 2</p>
      <p>Page id: {id}</p>
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
      <p>Page 3</p>
      <p className="back" onClick={() => navigate("/")}>
        Back
      </p>
    </>
  );
}

export default App;
