import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Logingame.css";

function Logingame() {
  const [teamId, setTeamId] = useState("");
  const navigate = useNavigate();

  const validTeams = [
    "ESCR1","ESCR2","ESCR3","ESCR4","ESCR5",
    "ESCR6","ESCR7","ESCR8","ESCR9","ESCR10",
    "ESCR11","ESCR12","ESCR13","ESCR14","ESCR15",
    "ESCR16","ESCR17","ESCR18","ESCR19","ESCR20"
  ];

  const handleEnter = () => {
    const formattedId = teamId.trim().toUpperCase();

    if (validTeams.includes(formattedId)) {
      navigate("/hero", { state: { teamId: formattedId } });
    } else {
      alert("❌ No such Team exists");
      setTeamId("");
    }
  };

  return (
    <section className="logback">
      <header className="log">Enter Your Team Id</header>

      <input
        type="text"
        className="teamInput"
        placeholder="Enter Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleEnter()}
      />

      <button className="logbutton" onClick={handleEnter}>
        Enter
      </button>
    </section>
  );
}

export default Logingame;
