import { useState } from 'react';
import Minesweeper from 'react-minesweeper';

function App() {
  const [minesweeperKey, setMinesweeperKey] = useState(0);

  const restartMinesweeper = () => {
    setMinesweeperKey(minesweeperKey + 1);
  };

  return (
    <div className="container">
      <div className="minesweeper__header">
        <button className="minesweeper__restart" onClick={restartMinesweeper}>
          😂
        </button>
      </div>
      <Minesweeper
        key={minesweeperKey}
        onWin={() => console.log('GAME WON')}
        onLose={() => console.log('GAME LOST')}
        bombChance={0.15} // 15% chance that a field will contain a bomb
        width={10} // amount of fields horizontally
        height={10} // amount of fields vertically
      />
    </div>
  );
}

export default App;
