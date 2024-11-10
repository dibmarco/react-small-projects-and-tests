import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate,
    Outlet,
    Navigate,
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
              <NavLink to="/page-2/subpage-1">Page 2</NavLink>
            </li>
            <li>
              <NavLink to="/page-3">Page 3</NavLink>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/page-2/" element={<Page2 />}>
              <Route index element={<Navigate replace to="subpage-1" />} />
              <Route path="subpage-1" element={<SubPage1 />} />
              <Route path="subpage-2" element={<SubPage2 />} />
            </Route>
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
  
        <NavLink to="subpage-1">Subpage-1</NavLink>
        <br />
        <NavLink to="subpage-2">Subpage-2</NavLink>
  
        <Outlet />
        <p className="back" onClick={() => navigate("/")}>
          Back
        </p>
      </>
    );
  }
  
  function SubPage1() {
    return (
      <>
        <h3>SubPage 1</h3>
        <p>Here's subpage 1.</p>
      </>
    );
  }
  
  function SubPage2() {
    return (
      <>
        <h3>SubPage 2</h3>
        <p>Here's subpage 2.</p>
        <p>And you may create many more.</p>
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
  