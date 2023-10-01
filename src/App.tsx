import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <h1>Home</h1>
        <ul>

        <li>
          <Link to={'/chamados'}>Chamados</Link>
        </li>

        <li>
          <Link to={'/chamadosAdm'}>Chamados Adm</Link>
        </li>
        
        </ul>
    </div>
  );
}

export default App;
