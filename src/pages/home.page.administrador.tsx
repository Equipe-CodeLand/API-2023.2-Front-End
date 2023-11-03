import Home from "../components/homes/homeAdministrador";
import Header from "../components/header/headerComponent";

export default function HomePageAdministrador() {
    const link = ["/home/cliente", "/home/atendente", "/home/administrador"]
    const link_title = ["cliente", "atendente", "administrador"]
    return (
        <div>
            <Header 
                link_0 = {link[0]}
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_title_0 = {link_title[0]}
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
            />
            <Home />
        </div>
    )
}