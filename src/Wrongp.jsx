import { useLocation, useNavigate } from "react-router-dom";
import "./Wrongp.css";

function Wrongp() {
  const navigate = useNavigate();
  const location = useLocation();

  const teamId = location.state?.teamId;
  const timeLeft = location.state?.timeLeft ?? 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section className="pback">
      <header className="pheader">Wrong Password<br/>Try Again!
      </header>

      <div className="wrongp">
        You have <b>{formatTime(timeLeft)} left!</b>
      </div>

      <button
  className="backbutton"
  onClick={() => navigate("/hero", { state: { teamId } })}
>
  Try Again
</button>


    </section>
  );
}

export default Wrongp;
