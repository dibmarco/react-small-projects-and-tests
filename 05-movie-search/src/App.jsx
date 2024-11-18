import { MovieProvider } from "./context/MovieContext";
import { QueryField } from "./Components/QueryField";
import { GeneralResults } from "./Components/GeneralResults";
import { PrimaryResult } from "./Components/PrimaryResult";

function App() {
  return (
    <MovieProvider>
      <h1 className="title">Movie Search</h1>
      <div className="app-container">
        <QueryField />
        <GeneralResults />
        <PrimaryResult />
      </div>
    </MovieProvider>
  );
}

export default App;
