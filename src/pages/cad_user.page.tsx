import React from 'react';
import CadUser from '../components/adm_form/caduserComponent';
import Header from '../components/header/headerComponent';
import '../components/adm_form/caduser.css'

const CadastroAdmin: React.FC = () => {

    const link = ["/home/administrador", "/chamadosAdm"] // Link para as páginas
    const link_title = ["Home", "Gerenciar chamados"] // titulo para as paginas
    return(
        <div className='pageCadUser'>
            <Header 
                link_0 = {link[0]} // Link para as páginas
                link_1 = {link[1]}
                link_title_0 = {link_title[0]} // titulo para as paginas
                link_title_1 = {link_title[1]}
            />
            <h1>Cadastro de novos usuários</h1> <br />
            <CadUser 
                nome="" 
                sobrenome=""
                cpf="" 
                email=""
                tipo="" 
                telefone="" 
                turno="" 
                senha= ""
            />
            <footer></footer>
        </div>
    );
}

export default CadastroAdmin;