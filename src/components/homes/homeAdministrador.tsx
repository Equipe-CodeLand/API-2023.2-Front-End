import "./styles/administrador.css";
import { Chart } from "react-google-charts";

const JsonPrioridade = {
    Dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    Baixa: [1, 1, 1, 1, 1, 1, 1],
    Media: [2, 2, 2, 2, 2, 2, 2],
    Alta: [3, 3, 3, 3, 3 ,3 ,3]
}

const JsonTema = {
    Dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    Tema1: [1, 1, 1, 1, 1, 1, 1],
    Tema2: [2, 2, 2, 2, 2, 2, 2],
    Tema3: [3, 3, 3, 3, 3 ,3 ,3],
    Tema4: [4, 4, 4, 4, 4 ,4 ,4]
}

const JsonTurno = {
    Dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    Diurno: [3, 3, 3, 3, 3, 3, 3],
    Vespertino: [2, 2, 2, 2, 2, 2, 2],
    Noturno: [1, 1, 1, 1, 1 ,1 ,1]
}

const JsonChamados = {
    Dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    Media: [1, 2, 3, 4, 5, 6, 7],
}

function JsonForData(variavel) {

    var arrIndice = []
    var arrValues = []

    arrIndice = Object.keys(variavel);
    arrValues = Object.values(variavel);

    let dadoChamado = []

    for (let i = 0; i < arrValues[0].length; i++) {
        dadoChamado[i] = arrValues.map((item) => {
            return item[i]
        })
    }

    dadoChamado.unshift(arrIndice)

    return dadoChamado
}

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
                    <div className="grafico prioridade">
                        <h3>Prioridade</h3>
                        <Chart
                            chartType="ColumnChart"
                            data={JsonForData(JsonPrioridade)}
                            width="100%"
                            height="100%"
                            legendToggle
                        />
                    </div>
                    <div className="grafico tema">
                        <h3>Tema</h3>
                        <Chart
                            chartType="ColumnChart"
                            data={JsonForData(JsonTema)}
                            width="100%"
                            height="100%"
                            legendToggle
                        />
                    </div>
                    <div className="grafico turno">
                        <h3>Turno</h3>
                        <Chart
                            chartType="ColumnChart"
                            data={JsonForData(JsonTurno)}
                            width="100%"
                            height="100%"
                            legendToggle
                        />
                    </div>
                    <div className="grafico media">
                        <h3>Media do tempo de chamada</h3>
                        <Chart
                            chartType="ColumnChart"
                            data={JsonForData(JsonChamados)}
                            width="100%"
                            height="100%"
                            legendToggle
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
