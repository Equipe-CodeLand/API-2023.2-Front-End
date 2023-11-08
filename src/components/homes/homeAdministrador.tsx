import "./styles/administrador.css";
import problemas from "../homes/chamadosfrequentes.png";
import atendentes from "../homes/atendentes.png";

export default function HomePageAdministrador() {
    return (
        <div className="homeAdm">
            <section className="conteudo">
                <div>
                    <div className="titulo">
                        <h1 id="tituloPrincipal">Bem vindo ao <strong>Callnet</strong>!</h1>
                        <p>Escolha o que deseja visualizar:</p>
                    </div>
                    <div className="chamados">
                        <div className="acessar"><a href="/chamadosAdm">Gerenciar chamados</a></div>
                        <div className="acessar"><a href="/cadastroUser">Cadastrar novo usuario</a></div>
                    </div>
                </div>
                
            </section>
            
            <section className="relatorios">
                <h2 id="titulo">Relatórios</h2>
                <hr />
                <div className="graficos">
                </div>
            </section>
        </div>
    );
}
