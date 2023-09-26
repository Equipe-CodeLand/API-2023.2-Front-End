import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <h1>Home</h1>
        <Link to={'/chamados'}>Chamados</Link>
    </div>
  );
}

export default App;
