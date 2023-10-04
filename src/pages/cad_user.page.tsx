import React from 'react';
import CadUser from '../components/adm_form/caduserComponent';

const CadastroAdmin: React.FC = () => {
    return (
        <div>
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