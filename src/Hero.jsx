import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const teamPins = ["1234", "5678", "2468", "1357", "9999", "0000"];
  const totalTeams = teamPins.length;

  const [value, setValue] = useState("");
  const [teamIndex, setTeamIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const timerRef = useRef();

  // 🔁 Sync team from route state
  useEffect(() => {
    if (location.state?.nextTeam !== undefined) {
      setTeamIndex(location.state.nextTeam % totalTeams);
    }
  }, [location.state]);

  // ⏳ TIMER
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          navigate("/trapped", {
            state: { nextTeam: (teamIndex + 1) % totalTeams }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [teamIndex, navigate]);

  // Reset inputs for new team
  useEffect(() => {
    setTimeLeft(120);
    setValue("");
  }, [teamIndex]);

  const handleNumberClick = (num) => {
    if (value.length < 6) setValue(value + num);
  };

  const handleClear = () => setValue("");

  const handleEnter = () => {
    clearInterval(timerRef.current);

    if (value === teamPins[teamIndex]) {
      navigate("/escaped", {
        state: {
          team: teamIndex + 1,
          timeTaken: 120 - timeLeft,
          nextTeam: (teamIndex + 1) % totalTeams
        }
      });
    } else {
      navigate("/wrongp", {
        state: {
          team: teamIndex + 1,
          timeLeft,
          nextTeam: (teamIndex + 1) % totalTeams
        }
      });
    }

    setValue("");
    setTimeLeft(0);
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
