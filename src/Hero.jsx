import { useState } from 'react'
import './Hero.css'

function Hero(){

     const [value, setValue] = useState("");
  const correctPin = "1234";

  const handleNumberClick = (num) => {
    if (value.length < 6) {   // limit length
      setValue(value + num);
    }
  };

  const handleEnter = () => {
    if (value === correctPin) {
      alert("✅ Access Granted!");
    } else {
      alert("❌ Wrong PIN");
      setValue("");
    }
  };

  const handleClear = () => {
    setValue("");
  };



    return(
        <>
        <section className='esback'>
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
        </>
    );

}

export default Hero