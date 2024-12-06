function Spinner({ type = "regular" }) {
  return (
    <div
      className="spinner"
      style={type === "small" ? { width: "auto", height: "12dvh" } : {}}
    ></div>
  );
}

export default Spinner;
