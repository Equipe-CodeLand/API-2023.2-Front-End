import Home from "../components/homes/homeAdministrador";
import Header from "../components/header/headerComponent";

export default function HomePageAdministrador() {
    const link = ["/chamadosAdm", "/cadastroUser"] // Link para as páginas
    const link_title = ["Gerenciar chamados", "Cadastrar usuários"] // titulo para as paginas
    return (
        <div>
            <Header 
                link_0 = {link[0]}
                link_1 = {link[1]}
                link_title_0 = {link_title[0]}
                link_title_1 = {link_title[1]}
            />
            <Home />
            <footer></footer>
        </div>
    )
}