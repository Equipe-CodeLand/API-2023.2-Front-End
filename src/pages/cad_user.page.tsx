import React from 'react';
import CadUser from '../components/adm_form/caduserComponent';
import Header from '../components/header/headerComponent';
import '../components/adm_form/caduser.css'

const CadastroAdmin: React.FC = () => {

    const link = ["/home/administrador", "/chamadosAdm", "/cadastroUser"] // Link para as páginas
    const link_title = ["Home", "Gerenciar chamados", "Cadastrar Usuário"] // titulo para as paginas
    return(
        <div>
            <Header 
                link_0 = {link[0]} // Link para as páginas
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_title_0 = {link_title[0]} // titulo para as paginas
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
            />
            <h1>Página para Cadastro de novos usuários</h1> <br />
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
        </div>
    );
}

export default CadastroAdmin;