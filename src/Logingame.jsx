import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Logingame.css";

function Logingame() {
  const [teamId, setTeamId] = useState("");
  const navigate = useNavigate();

  const validTeams = [
    "TEAM1","TEAM2","TEAM3","TEAM4","TEAM5",
    "TEAM6","TEAM7","TEAM8","TEAM9","TEAM10",
    "TEAM11","TEAM12","TEAM13","TEAM14","TEAM15",
    "TEAM16","TEAM17","TEAM18","TEAM19","TEAM20"
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
