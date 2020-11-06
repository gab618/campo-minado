import { useEffect, useState } from 'react';
import Minesweeper from 'react-minesweeper';
import api from './services/api';

function App() {
  const [minesweeperKey, setMinesweeperKey] = useState(0);
  const [username, setUsername] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    getKey();
  }, []);

  async function getKey() {
    const response = await api.get('api/game');
    setKey(response.data.key);
  }

  async function submitPoints() {
    const hash = 'U2FsdGVkX1+TUM9/CfwvfxxYHxc48j0WLYwrsWotnRA=';
    await api.post('api/game', {
      key,
      hash,
      user: username,
    });
    alert(`Parebéns! +30 pontos para ${username}`);
  }

  const restartMinesweeper = () => {
    setMinesweeperKey(minesweeperKey + 1);
    getKey();
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <h1>Campo minado</h1>
      <a href="https://twitch.tv/ezrealblindado">
        pontos na live twitch.tv/ezrealblindado
      </a>
      <div className="container">
        <input
          className="user-input"
          type="text"
          placeholder="Seu nick da twitch aqui"
          onChange={handleChangeUsername}
          value={username}
        />
        <div className="minesweeper__header">
          <button className="minesweeper__restart" onClick={restartMinesweeper}>
            🤡
          </button>
        </div>
        <Minesweeper
          key={minesweeperKey}
          onWin={submitPoints}
          onLose={() => alert('Você perdeu!')}
          bombChance={0.15} // 15% chance that a field will contain a bomb
          width={10} // amount of fields horizontally
          height={10} // amount of fields vertically
        />
      </div>
    </>
  );
}

export default App;
