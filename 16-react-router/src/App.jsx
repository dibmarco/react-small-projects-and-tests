import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello</h1>
        <NavLink to="1">Page 1</NavLink>
        <NavLink to="2">Page 2</NavLink>
        <NavLink to="whatever">Page Whatever</NavLink>
        <Routes>
          <Route path="/:id" element={<NewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NewPage() {
  const { id } = useParams();
  console.log(id);

  return <p>New Page No. {id}</p>;
}

export default App;
