import Header from "../components/header/headerComponent";
import ProblemasSolucoes from "../components/problemasConhecidos/problemas";

export default function Problemas() {
    const link = ["/home/administrador", "/chamadosAdm", "/cadastroUser", "/cadastroSolucao"] // Link para as páginas
    const link_title = ["Home", "Gerenciar chamados", "Cadastrar usuário", "Cadastrar Problemas e Soluções"] // titulo para as paginas
    return (
        <div>
            <Header 
                link_0 = {link[0]}
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_3 = {link[3]}
                link_title_0 = {link_title[0]}
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
                link_title_3 = {link_title[3]}
            />
            <ProblemasSolucoes />
            <footer></footer>
        </div>
    )
}