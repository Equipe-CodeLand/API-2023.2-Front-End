import Home from "../components/homes/homeAtendente";
import Header from "../components/header/headerComponent";

export default function HomePageAtendente() {
    const link = ["/chamadosAte", "/meuschamados/atendente"] // Link para as páginas
    const link_title = ["Ver todos os chamados", "Meus chamados"] // titulo para as paginas
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