import './App.css';
import { Link } from 'react-router-dom';
import Header from './components/header/headerComponent';

function App() {

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
        <h1>Home</h1>
      </main>
    </div>
  );
}

export default App;
