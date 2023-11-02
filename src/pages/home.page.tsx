import React, { useEffect } from "react";
import Header from '../components/header/headerComponent';
import '../components/index/home.css';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

interface HomeProps {
    data: any[]; // Defina o tipo correto para os dados recebidos
}

const Home: React.FC<HomeProps> = ({ data }) => {
    useEffect(() => {
        document.title="Home"
    }, []);
    const link = ["/chamados", "/chamados/Adm", "/cadastroUser", "/cadastroCliente", '/meusChamados'] // Link para as páginas
    const link_title = ["Chamados", "Chamados ADM", "Cadastrar Usuário", "Forms Cadastro de Cliente", 'Meus Chamados'] // titulo para as paginas
    return(
        <div id="home">
            <h1 className="text-tiny">Seja Bem-vindo(a) ao CallNet!</h1>
            <div>
                <h4>Escolha o que deseja visualizar:</h4>
            </div>
            <div className="links">
                {/*<Link to={'/chamados'}>Chamados</Link> <br />*/}
                <Link to={'/chamados/Adm'}>Chamados Adm</Link> <br />
                <Link to={'/cadastroUser'}>Cadastrar Usuário (ADM)</Link> <br />
                <Link to={'/cadastroCliente'}>Forms Cadastro de Cliente</Link> <br />
                <Link to={'/chamado/Ate'}>Chamados Atendente</Link><br />
                <Link to={'formularioCli'}>Formulário Cliente</Link><br />
                <Link to={'/chamadoCli'}>Chamados Cliente</Link><br />
                <Link to={'/meusChamados/atendente'}>Meus chamados(Atendente)</Link><br />
            </div>
            <div className="sobre">
                <h3>Sobre</h3>
                <p>CallNet, o sistema que será desenvolvido, é focado em fornecer auxílio aos problemas relacionados a Internet Fixa, e busca aprimorar o sistema de Gerenciamento de Chamadas de Serviço. Nosso objetivo é que nossos clientes tenham acesso à soluções de seus problemas sobre Internet, de forma mais rápida e eficaz. </p>
            </div>
        </div>
    )
}

export default Home;