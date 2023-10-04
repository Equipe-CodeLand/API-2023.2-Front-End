import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <h1>Home</h1>
          <Link to={'/chamados'}>Chamados</Link> <br />
          <Link to={'/chamados/Adm'}>Chamados Adm</Link> <br />
          <Link to={'/cadastroUser'}>Cadastrar Usuário (ADM)</Link> <br />
          <Link to={'/cadastroCliente'}>Forms Cadastro de Cliente (ADM)</Link> <br />
    </div>
  );
}

export default App;
