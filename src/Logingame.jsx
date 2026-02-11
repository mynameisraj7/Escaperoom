import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Logingame.css";

function Logingame() {
  const [teamId, setTeamId] = useState("");
  const navigate = useNavigate();

  const validTeams = [
    "Escr1","Escr2","Escr3","Escr4","Escr5",
    "Escr6","Escr7","Escr8","Escr9","Escr10",
    "Escr11","Escr12","Escr13","Escr14","Escr15",
    "Escr16","Escr17","Escr18","Escr19","Escr20"
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
