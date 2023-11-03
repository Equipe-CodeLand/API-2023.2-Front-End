import "./styles/administrador.css";

export default function Home() {
    return (
        <div className="homeAdm">
            <section className="conteudo">
                <div>
                    <div className="titulo">
                        <h1 id="tituloPrincipal">Bem vindo ao <strong>Callnet</strong>!</h1>
                        <p>Monitore e organize seus atendentes!</p>
                    </div>
                    <div className="chamados">
                        <div className=""><a href="/chamados/Adm">Acessar chamados</a></div>
                        <div className=""><a href="/cadastroUser">Cadastrar novo Usuário</a></div>
                    </div>
                </div>
            </section>
        </div>
    )
}