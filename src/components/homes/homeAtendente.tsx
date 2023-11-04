import "./styles/administrador.css"

export default function Home() {
    return (
        <div className="homeCli">
            <section className="conteudo">
                <div>
                    <div className="titulo">
                        <h1 id="tituloPrincipal">Bem vindo ao <strong>Callnet</strong>!</h1>
                        <p>Escolha o que deseja vizualizar:</p>
                    </div>
                    <div className="chamados">
                        <div className="acessar"><a href="/criarNovoChamado">Acessar chamados</a></div>
                        <div className="acessar"><a href="/visualizarChamado">Cadastrar novo usuario</a></div>
                    </div>
                </div>
            </section>           
        </div>
    )
}