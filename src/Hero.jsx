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
    ESCR1: "1234",
    ESCR2: "5678",
    ESCR3: "2468",
    ESCR4: "1357",
    ESCR5: "9999",
    ESCR6: "0000",
    ESCR7: "1111",
    ESCR8: "2222",
    ESCR9: "3333",
    ESCR10: "4444",
    ESCR11: "5555",
    ESCR12: "6666",
    ESCR13: "7777",
    ESCR14: "8888",
    ESCR15: "4321",
    ESCR16: "8765",
    ESCR17: "2460",
    ESCR18: "1350",
    ESCR19: "9090",
    ESCR20: "1212"
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
