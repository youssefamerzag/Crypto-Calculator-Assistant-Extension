import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Coin {
  id: string;
  priceUsd: number;
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [usd, setUsd] = useState<number>(1);
  const [coinValue, setCoinValue] = useState<number>(0);

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets')
      .then(res => setCoins(res.data.data));
  }, []);

  return (
    <div className='container'>
      <div className='card'>
        <div className='links'>
          <a href='https://github.com/youssefamerzag'><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png" alt="github"/></a>
          <a href='https://www.linkedin.com/in/youssefamerzag/'><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/linkedin.png" alt="linkedin"/></a>
          <p>Crypto Calculator Assistant</p>
        </div>
        <form className='form'>
          <div>
            <p className='label'>You pay</p>
          </div>
          <div className='input-group'>
            <select className='select' onChange={(e) => setUsd(Number(e.target.value))} value={usd}>
              <option value='1'>USD</option>
            </select>
            <input className='input' type='number' onChange={(e) => setUsd(Number(e.target.value))} ></input>
          </div>
          <div>
            <p className='label'>You get</p>
          </div>
          <div className='input-group'>
            <select className='select' onClick={(e) => setCoinValue(Number((e.target as HTMLSelectElement).value))}>
              {coins.map((coin, index) => 
                <option key={index} value={coin.priceUsd}>{coin.id}</option>
              )}
            </select>
            <input className='input' placeholder='Choose' type='number' value={coinValue !== 0 ? (usd / coinValue) : ''} readOnly></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
