import { NavLink } from "react-router-dom";
import useQuery from "../hooks/useQuery";

function QueryField({ inputEl }) {
  const { query, setQuery, navigateToWord, handleKeyPress } = useQuery();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-3 w-[350px] mx-auto md:w-[600px] mb-2">
      <NavLink
        className="sm:pr-[1px] text-slate-900 hover:text-slate-700"
        to="/"
      >
        <i className="fa-solid fa-house"></i>
      </NavLink>

      <input
        className="border py-1 px-2.5 w-[280px] sm:w-[320px] md:w-[400px] lg:w-[420px] rounded-md"
        type="text"
        value={query}
        ref={inputEl}
        placeholder="Look up a word"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <button
        className="border py-1 px-4 bg-slate-300/75 rounded-md mr-2 hover:bg-slate-300"
        onClick={() => navigateToWord()}
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default QueryField;
