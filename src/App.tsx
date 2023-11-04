import './App.css';
import { Link } from 'react-router-dom';
import Header from './components/header/headerComponent';
import Home from './pages/home.page';
import { useEffect, useState } from 'react';
import LoginPage from './pages/login.page';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aqui você busca os dados da API e depois os define no estado.
    fetch('http://localhost:5000/chamados')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const link = ["/chamados", "/chamados/Adm", "/cadastroUser", "/cadastroCliente","/chamados/Ate","/formularioCli","/login"] // Link para as páginas
  const link_title = ["Chamados", "Chamados Adm", "Cadastrar Usuário (ADM)", "Forms Cadastro de Cliente (ADM)","Chamados Atendente","Formulário Cliente","Login"] // titulo para as paginas

  return (
    <div className="App">
      <></>
      <main>
        <LoginPage />
      </main>
    </div>
  );
}

export default App;
