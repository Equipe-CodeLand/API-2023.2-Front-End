import { useState } from "react";
import "./styles/administrador.css";
import Grafico from "../graficos/graficos";
import axios from "axios"

let JsonPadrao = {
    Dias: [""],
    Chamadas: [0]
}

let JsonPrioridade = {
    Dias: ["Baixa", "Média", "Alta"],
    Chamadas: [0, 0, 0]
}

let JsonTema = {
    Dias: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
    Chamadas: [0, 0, 0, 0]
}

let JsonTurno = {
    Dias: ["Manhã", "Tarde", "Noite", "Madrugada"],
    Chamadas: [0, 0, 0, 0],
}

let JsonChamados = {
    Dias: ["Tempo Medio para realizar os chamados"],
    Media: [0],
}

export default function HomePageAdministrador() {
    const [tema, setTema] = useState('prioridade');
    const [data, setData] = useState(JsonPadrao);
    const [title, setTitle] = useState('');
    const [dateInicio, setDateInicio] = useState("");
    const [dateFinal, setDateFinal] = useState("");

    let dataAtual = new Date()
    
    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
    }

    const handleDateInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTema = e.target.value
        setDateInicio(newTema)
    }

    const handleDateFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTema = e.target.value
        setDateFinal(newTema)
    }

    /* QUANDO EU CLICO NO BOTAO DE ENVIAR */

    const handleSubmit = () => {
        console.log(dateInicio)
        console.log(dateFinal)

        if (dateInicio == "" || dateFinal == "") {
            alert("Insira as datas")
            return
        } else {
            let partesDataInicio = dateInicio.split("-")
            var diaInicio = partesDataInicio[2]
            var mesInicio = partesDataInicio[1]
            var anoInicio = partesDataInicio[0]
            let partesDataFinal = dateFinal.split("-")
            var diaFinal = partesDataFinal[2]
            var mesFinal = partesDataFinal[1]
            var anoFinal = partesDataFinal[0]
        }

        /* filtro dos temas */

        let title:string = ""
        let data:any = JsonChamados

        switch (tema) {
            case 'prioridade':
                title = "Prioridade"
                axios.get('http://localhost:5000/relatorios/chamadosPorPrioridade', {
                    params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
                }).then(res => {
                    var prioridade = res.data
                    console.log(prioridade[0].numeroChamados)
                    JsonPrioridade = {
                        Dias: ["Baixa", "Média", "Alta"],
                        Chamadas: [prioridade[0].numeroChamados, prioridade[1].numeroChamados, prioridade[2].numeroChamados]
                    }
                })
                data = JsonPrioridade;
                break;
            case 'tema':
                title = "Tema"
                axios.get('http://localhost:5000/relatorios/chamadosPorTema', {
                    params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
                }).then(res => {
                    let temas = res.data
                    JsonTema = {
                        Dias: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
                        Chamadas: [temas[0].numeroChamados, temas[1].numeroChamados, temas[3].numeroChamados, temas[2].numeroChamados]
                    }
                })
                data = JsonTema;
                break;
            case 'turno':
                title = "Turno"
                axios.get('http://localhost:5000/relatorios/chamadosPorTurno', {
                    params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
                }).then(res => {
                    let turnos = res.data
                    JsonTurno = {
                        Dias: ["Manhã", "Tarde", "Noite", "Madrugada"],
                        Chamadas: [turnos[0].numeroChamados, turnos[1].numeroChamados, turnos[2].numeroChamados, turnos[3].numeroChamados],
                    }
                })
                data = JsonTurno;
                break;
            case 'media':
                title = "Media"
                axios.get('http://localhost:5000/relatorios/tempoMedioTotal', {
                    params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
                }).then(res => {
                    let medias = res.data
                    console.log(medias)
                })
                data = JsonChamados;
                break;
            default:
                break;
        }

        setTitle(title);
        setData(data);
    }

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
                <div className="filtro">
                    <div className="inicio">
                        <label htmlFor="">Data de início</label>
                        <input type="date" id="inicio" value={dateInicio} max={dateFinal} onChange={handleDateInicioChange}/>
                    </div>
                    <div className="final">
                        <label htmlFor="">Data final</label>
                        <input type="date" id="final" value={dateFinal} min={dateInicio} onChange={handleDateFinalChange}/>
                    </div>
                    <div className="temas">
                        <select name="tema" id="tema" value={tema} onChange={handleTemaChange}>
                            <option value="prioridade">Prioridade</option>
                            <option value="tema">Tema da chamada</option>
                            <option value="turno">Turnos</option>
                            <option value="media">Media do tempo de chamada</option>
                        </select>
                    </div>
                    <div className="gerar">
                        <button onClick={handleSubmit}>Gerar</button>
                    </div>
                </div>
                <hr />
                <div className="graficos">
                    <Grafico title={title} data={data}/>
                </div>
            </section>
        </div>
    );
}
