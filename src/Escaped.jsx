import { useLocation, useNavigate } from "react-router-dom";
import "./Escaped.css";

function Escaped() {
  const location = useLocation();
  const navigate = useNavigate();

  const team = location.state?.team ?? 1;
  const timeTaken = location.state?.timeTaken ?? 0;

  return (
    <section className="esaback">
      <header className="header">You Escaped </header>

      <div className="es">
        All riddles solved.<br />
        Locks broken.<br />
        Time defeated.
      </div>
        <div className="time"> Team {team} escaped in <b>{timeTaken}</b> seconds!</div>
      {/* <button className="backBtn" onClick={() => navigate("/")}>
        Next Team
      </button> */}
    </section>
  );
}

export default Escaped;
