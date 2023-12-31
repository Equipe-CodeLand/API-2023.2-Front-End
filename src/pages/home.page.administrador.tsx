import Home from "../components/homes/homeAdministrador";
import Header from "../components/header/headerComponent";

export default function HomePageAdministrador() {
    const link = ["/chamadosAdm", "/cadastroUser", "/cadastroSolucao", "/problemas"] // Link para as páginas
    const link_title = ["Gerenciar chamados", "Cadastrar usuários", "Cadastrar Problemas e Soluções", "Visualizar problemas conhecidos"] // titulo para as paginas
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
            <Home />
            <footer></footer>
        </div>
    )
}