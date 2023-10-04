import React from 'react';
import CadUser from '../components/adm_form/caduserComponent';
import Header from '../components/header/headerComponent';

const CadastroAdmin: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Página de Cadastro do Administrador</h1>
            <CadUser 
                nome="" 
                sobrenome=""
                cpf="" 
                email=""
                tipo="" 
                telefone="" 
                turno="" 
            />
        </div>
    );
}

export default CadastroAdmin;