import React from 'react';
import Header from '../components/header/headerComponent';
import CadastroSolucao from '../components/cadastroSolucao/cadSolucaoComponent';

const CadSolucaoPage: React.FC = () => {
    const link = ["/home/administrador", "/chamadosAdm", "/cadastroUser", "/problemas"];
    const link_title = ["Home", "Chamados", "Cadastrar usuário", "Visualizar problemas conhecidos"];

    return (
        <>
            <Header
                link_0={link[0]}
                link_1={link[1]}
                link_2={link[2]}
                link_3={link[3]}
                link_title_0={link_title[0]}
                link_title_1={link_title[1]}
                link_title_2={link_title[2]}
                link_title_3={link_title[3]}
            />

            <div className='pageCadSolucao'>
                <h1 style={{ textAlign: 'center', marginTop: 30 }}>Cadastrar solução para problemas conhecidos</h1>
                <CadastroSolucao tema="" mensagem="" solucoes={[]} />
            </div>
        </>
    );
}

export default CadSolucaoPage;
