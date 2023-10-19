import React from 'react'
import CliForm from '../components/cli_form/cli_formComponent'
import Header from '../components/header/headerComponent'

const FormularioCli: React.FC = () => {

    const link = ["/", "/chamados/Cliente", "/problemas", "/cadastroCliente"] // Link para as páginas
    const link_title = ["Home", "Painel do Cliente", "Problemas comuns", "Iniciar chamado"] // titulo para as paginas
    return(
        <div>
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
            <h1>Página de cadastro do cliente</h1>
            <CliForm tema=""mensagem=''/>
        </div>
    )
}

export default FormularioCli;