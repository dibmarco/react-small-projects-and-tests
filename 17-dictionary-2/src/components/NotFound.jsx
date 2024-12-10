import { useEffect } from "react";

function NotFound({ focusInput }) {
  useEffect(() => {
    focusInput(); // Focus the input field when NotFound is rendered
  }, [focusInput]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[70dvh] text-center">
      <div className="bg-slate-200 w-fit px-5 py-4 rounded-md md:px-9 md:py-6">
        <i className="fa-solid fa-circle-question text-slate-700 text-4xl mb-4 animate-pulse"></i>
        <p className="text-lg text-slate-900">
          Uh-oh! No matches for that word. <br /> Check for typos and try again!
        </p>
      </div>
    </div>
  );
}

export default NotFound;
