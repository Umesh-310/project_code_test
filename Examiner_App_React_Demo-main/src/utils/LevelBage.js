export const LevelBage = ({ level }) => {
  const color =
    level === "Medium" ? "#efad65" : level === "Hard" ? "#bf0012" : "green";
  return (
    <div
      className="btn"
      style={{
        color,
        padding: "3px 15px",
        fontSize: "15px",
        border: "none",
        fontWeight: 500,
        opacity: "unset",
        cursor: "auto",
      }}
      disabled
    >
      {level}
    </div>
  );
};
