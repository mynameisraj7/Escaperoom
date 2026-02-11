import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const GAME_TIME = 300; // 7 minutes
  const teamId = location.state?.teamId;

  // 🔐 Passwords for 20 teams
  const teamPasswords = {
    Escr1: "1234",
    Escr2: "5678",
    Escr3: "2468",
    Escr4: "1357",
    Escr5: "9999",
    Escr6: "0000",
    Escr7: "1111",
    Escr8: "2222",
    Escr9: "3333",
    Escr10: "4444",
    Escr11: "5555",
    Escr12: "6666",
    Escr13: "7777",
    Escr14: "8888",
    Escr15: "4321",
    Escr16: "8765",
    Escr17: "2460",
    Escr18: "1350",
    Escr19: "9090",
    Escr20: "1212"
  };

  const correctPin = teamPasswords[teamId];

  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
  const saved = sessionStorage.getItem(`timer_${teamId}`);
  const parsed = saved ? parseInt(saved) : GAME_TIME;

  // If old timer was 7 min, reset to new 5 min
  return parsed > GAME_TIME ? GAME_TIME : parsed;
});


  // 🚫 Block if no login
  useEffect(() => {
    if (!teamId) navigate("/");
  }, [teamId, navigate]);

  // 💾 Save timer for THIS team only
  useEffect(() => {
    sessionStorage.setItem(`timer_${teamId}`, timeLeft);
  }, [timeLeft, teamId]);

  // ⏳ Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/trapped", { state: { teamId } });
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, navigate, teamId]);

  const handleNumberClick = (num) => {
    if (value.length < 7) setValue(v => v + num);
  };

  const handleClear = () => setValue("");

  const handleEnter = () => {
    clearInterval(timerRef.current);

    if (value === correctPin) {
      navigate("/escaped", {
        state: { teamId, timeTaken: GAME_TIME - timeLeft }
      });
    } else {
      navigate("/wrongp", {
        state: { teamId, timeLeft }
      });
    }

    setValue("");
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  return (
    <section className="esback">
      <header className="head">Enter Password to ESCAPE</header>
      <div className="team">Team {teamId}</div>

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
