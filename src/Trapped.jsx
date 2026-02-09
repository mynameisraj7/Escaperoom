import { useLocation, useNavigate } from "react-router-dom";
import "./Trapped.css";

function Trapped() {
  const navigate = useNavigate();


  return (
    <section className="traback">
      <header className="theader">You're Trapped<br/>Escape Failed </header>

      <div className="trap">
        Time’s up<br/>The door stays shut.
      </div>

      {/* <button className="backBtn" onClick={() => navigate("/")}>
        Next Team
      </button> */}
    </section>
  );
}

export default Trapped;
