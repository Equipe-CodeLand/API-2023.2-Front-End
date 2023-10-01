import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <h1>Home</h1>
          <Link to={'/chamados'}>Chamados</Link> <br />
          <Link to={'/chamadosAdm'}>Chamados Adm</Link> <br />
          <Link to={'/cadastroUser'}>Cadastrar Usuário (ADM)</Link> <br />
    </div>
  );
}

export default App;
