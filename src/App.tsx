import './App.css';
import { Link } from 'react-router-dom';
import Header from './components/header/headerComponent';
import Home from './pages/home.page';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aqui você busca os dados da API e depois os define no estado.
    fetch('http://localhost:5000/chamados')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const link = ["/chamados", "/chamados/Adm", "/cadastroUser", "/cadastroCliente"] // Link para as páginas
  const link_title = ["Chamados", "Chamados Adm", "Cadastrar Usuário (ADM)", "Forms Cadastro de Cliente (ADM)"] // titulo para as paginas

  return (
    <div className="App">
      <Header 
        link_0 = {link[0]} // Link para as páginas
        link_1 = {link[1]}
        link_2 = {link[2]}
        link_3 = {link[3]}
        link_title_0 = {link_title[0]} // titulo para as paginas
        link_title_1 = {link_title[1]}
        link_title_2 = {link_title[2]}
        link_title_3 = {link_title[3]}
      />
      <main>
        <Home data={data} />
      </main>
    </div>
  );
}

export default App;
