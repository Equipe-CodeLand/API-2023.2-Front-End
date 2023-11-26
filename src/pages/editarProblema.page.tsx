import EditarProblema from "../components/cadastroSolucao/editSolucaoComponent";
import Header from "../components/header/headerComponent";

export default function Problemas() {
    const link = ["/home/administrador", "/chamadosAdm", "/cadastroUser", "/cadastroSolucao", "/problemas"] // Link para as páginas
    const link_title = ["Home", "Gerenciar chamados", "Cadastrar usuário", "Cadastrar Problemas e Soluções", "Visualizar problemas e soluções"] // titulo para as paginas
    return (
        <div>
            <Header 
                link_0 = {link[0]}
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_3 = {link[3]}
                link_4 = {link[4]}
                link_title_0 = {link_title[0]}
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
                link_title_3 = {link_title[3]}
                link_title_4 = {link_title[4]}
            />
            <EditarProblema />
            <footer></footer>
        </div>
    )
}