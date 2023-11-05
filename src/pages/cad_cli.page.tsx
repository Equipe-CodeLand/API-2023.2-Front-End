import React from 'react'
import CadCli from '../components/cad_cli/cad_cliComponent'
import Header from '../components/header/headerComponent'

const CadastroCli: React.FC = () => {

    const link = ["/"] // Link para as páginas
    const link_title = ["Home"] // titulo para as paginas
    return(
        <div>
            <Header 
                link_0 = {link[0]} // Link para as páginas
                link_title_0 = {link_title[0]} // titulo para as paginas

            />
            <h1>Antes de continuarmos, precisamos <br /> de algumas informações</h1>
            <CadCli nome="" sobrenome="" cpf="" telefone="" email='' senha=''/>
        </div>
    )
}

export default CadastroCli;