import { useState } from 'react'
import './Hero.css'

function Hero(){

  const [value, setValue] = useState("");
  const [teamIndex, setTeamIndex] = useState(0);

  const teamPins = ["1234", "5678", "2468", "1357", "9999", "0000"];

  const handleNumberClick = (num) => {
    if (value.length < 6) {
      setValue(value + num);
    }
  };

  const handleEnter = () => {
    if (value === teamPins[teamIndex]) {
      alert(`✅ Team ${teamIndex + 1} Correct!`);
    } else {
      alert(`❌ Team ${teamIndex + 1} Wrong PIN`);
    }

    // Switch to next team turn
    setTeamIndex((prev) => (prev + 1) % teamPins.length);
    setValue("");
  };

  const handleClear = () => setValue("");

  return(
    <section className='esback'>
      <header className='head'>Enter Password to ESCAPE</header>
      <div className='team'>Team {teamIndex + 1}'s Turn</div>

      <div className="container">
        <input type="password" value={value} readOnly className="display" />

        <div className="pad">
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <button key={n} onClick={() => handleNumberClick(n)}>
              {n}
            </button>
          ))}

          <button onClick={handleClear}>C</button>
          <button onClick={() => handleNumberClick(0)}>0</button>
          <button className="enter" onClick={handleEnter}>Enter</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
