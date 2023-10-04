import React from 'react'
import CadCli from '../components/cad_form/cad_cliComponent'

const CadastroCli: React.FC = () => {
    return (
        <div>
            <h1>Página de cadastro do cliente</h1>
            <CadCli nome="" sobrenome="" cpf="" tema="" telefone="" email='' mensagem=''/>
        </div>
    )
}

export default CadastroCli;