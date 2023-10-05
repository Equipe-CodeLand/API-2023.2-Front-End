import React from 'react'
import CadCli from '../components/cad_form/cad_cliComponent'
import Header from '../components/header/headerComponent'

const CadastroCli: React.FC = () => {

    const link_title = []

    return (
        <div>
            <Header />
            <h1>Página de cadastro do cliente</h1>
            <CadCli nome="" sobrenome="" cpf="" tema="" telefone="" email='' mensagem=''/>
        </div>
    )
}

export default CadastroCli;