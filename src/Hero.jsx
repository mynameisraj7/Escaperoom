import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const teamPins = ["1234", "5678", "2468", "1357", "9999", "0000"];
  const totalTeams = teamPins.length;

  const [value, setValue] = useState("");
  const [teamIndex, setTeamIndex] = useState(0);

  // 🔥 Load timers from SESSION storage (not localStorage)
  const [teamTimes, setTeamTimes] = useState(() => {
    const saved = sessionStorage.getItem("escapeTeamTimes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === totalTeams) {
          return parsed;
        }
      } catch {}
    }
    return Array(totalTeams).fill(120);
  });

  const timeLeft = teamTimes[teamIndex];

  // 🔁 Sync team turn
  useEffect(() => {
    if (location.state?.nextTeam !== undefined) {
      setTeamIndex(location.state.nextTeam % totalTeams);
    }
  }, [location.state, totalTeams]);

  // 💾 Save timers (session only)
  useEffect(() => {
    sessionStorage.setItem("escapeTeamTimes", JSON.stringify(teamTimes));
  }, [teamTimes]);

  // ⏳ Timer logic
  useEffect(() => {
    if (teamTimes[teamIndex] <= 0) return;

    timerRef.current = setInterval(() => {
      setTeamTimes(prev => {
        const newTimes = [...prev];

        if (newTimes[teamIndex] <= 1) {
          clearInterval(timerRef.current);
          newTimes[teamIndex] = 0;

          navigate("/trapped", {
            state: { nextTeam: (teamIndex + 1) % totalTeams }
          });
        } else {
          newTimes[teamIndex] -= 1;
        }

        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [teamIndex, navigate, totalTeams]);

  const handleNumberClick = (num) => {
    if (value.length < 6) setValue(v => v + num);
  };

  const handleClear = () => setValue("");

  const handleEnter = () => {
    clearInterval(timerRef.current);

    if (value === teamPins[teamIndex]) {
      navigate("/escaped", {
        state: {
          team: teamIndex + 1,
          timeTaken: 120 - teamTimes[teamIndex],
          nextTeam: (teamIndex + 1) % totalTeams
        }
      });
    } else {
      navigate("/wrongp", {
        state: {
          team: teamIndex + 1,
          timeLeft: teamTimes[teamIndex],
          nextTeam: (teamIndex + 1) % totalTeams
        }
      });
    }

    setValue("");
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  return (
    <section className="esback">
      <header className="head">Enter Password to ESCAPE</header>
      <div className="team">Team {teamIndex + 1}'s Turn</div>

      <div className="container">
        <input type="password" value={value} readOnly className="display" />

        <div className="pad">
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <button key={n} onClick={() => handleNumberClick(n)}>{n}</button>
          ))}
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleNumberClick(0)}>0</button>
          <button className="enter" onClick={handleEnter}>Enter</button>
        </div>
      </div>

      <div className="timer">You have {formatTime(timeLeft)} left</div>
    </section>
  );
}

export default Hero;
