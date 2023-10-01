import React from 'react';
import CadUser from '../components/adm_form/caduserComponent';

const CadastroUser: React.FC = () => {
    return (
        <div>
            <h1>Página de Cadastro do Administrador</h1>
            <CadUser nome="" cpf="" tipo="" telefone="" />
        </div>
    );
}

export default CadastroUser;