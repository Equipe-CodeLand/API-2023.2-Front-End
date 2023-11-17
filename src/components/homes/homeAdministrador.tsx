import { useState } from "react";
import "./styles/administrador.css";
import Grafico from "../graficos/graficos";
import axios from "axios"

let JsonPadrao = {
    Dias: [""],
    Chamadas: [0]
}

let JsonPrioridade = {
    Prioridades: ["Baixa", "Média", "Alta"],
    Chamadas: [0, 0, 0]
}

let JsonPrioridadeMedia = {
    Prioridades: ["Baixa", "Média", "Alta"],
    Minutos: [0, 0, 0]
}

let JsonTema = {
    Temas: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
    Chamadas: [0, 0, 0, 0]
}

let JsonTemaMedia = {
    Temas: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
    Minutos: [0, 0, 0, 0]
}

let JsonTurno = {
    Turnos: ["Manhã", "Tarde", "Noite", "Madrugada"],
    Chamadas: [0, 0, 0, 0],
}

let JsonMediasTotal = {
    Media: ["Tempo médio de chamadas"],
    Minutos: [1]
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
        let data:any = JsonPadrao

        axios.get('http://localhost:5000/relatorios/chamadosPorPrioridade', {
            params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
        }).then(res => {
            var prioridade = res.data
            console.log()
            JsonPrioridade = {
                Prioridades: ["Baixa", "Média", "Alta"],
                Chamadas: [prioridade[0].numeroChamados, prioridade[1].numeroChamados, prioridade[2].numeroChamados]
            }
            JsonPrioridadeMedia = {
                Prioridades: ["Baixa", "Média", "Alta"],
                Minutos: [
                    prioridade[0].tempoMedio.minutos + prioridade[0].tempoMedio.horas*60, 
                    prioridade[1].tempoMedio.minutos + prioridade[1].tempoMedio.horas*60, 
                    prioridade[2].tempoMedio.minutos + prioridade[2].tempoMedio.horas*60
                ]
            }
        })

        axios.get('http://localhost:5000/relatorios/chamadosPorTema', {
            params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
        }).then(res => {
            let temas = res.data
            JsonTema = {
                Temas: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
                Chamadas: [temas[0].numeroChamados, temas[1].numeroChamados, temas[3].numeroChamados, temas[2].numeroChamados]
            }
            JsonTemaMedia = {
                Temas: ["Acesso a Internet", "Moldem", "Velocidade da Internet", "Outros"],
                Minutos: [
                    temas[0].tempoMedio.minutos + temas[0].tempoMedio.horas*60, 
                    temas[1].tempoMedio.minutos + temas[1].tempoMedio.horas*60, 
                    temas[3].tempoMedio.minutos + temas[3].tempoMedio.horas*60, 
                    temas[2].tempoMedio.minutos + temas[2].tempoMedio.horas*60
                ]
            }
        })

        axios.get('http://localhost:5000/relatorios/chamadosPorTurno', {
            params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
        }).then(res => {
            let turnos = res.data
            JsonTurno = {
                Turnos: ["Manhã", "Tarde", "Noite", "Madrugada"],
                Chamadas: [turnos[0].numeroChamados, turnos[1].numeroChamados, turnos[2].numeroChamados, turnos[3].numeroChamados],
            }
        })

        axios.get('http://localhost:5000/relatorios/tempoMedioTotal', {
            params: {diaInicio: diaInicio, mesInicio: mesInicio, anoInicio: anoInicio, diaFinal: diaFinal, mesFinal: mesFinal, anoFinal: anoFinal}
        }).then(res => {
            let medias = res.data
            JsonMediasTotal = {
                Media: ["Tempo Medio para realizar os chamados"],
                Minutos: [medias.minutos + medias.horas*60],
            }
        })

        setTimeout(function() {
            switch (tema) {
                case 'prioridade':
                    title = "Prioridade"
                    data = JsonPrioridade;
                    break;
                case 'prioridadeMedia':
                    title = "Prioridade"
                    data = JsonPrioridadeMedia;
                    break;
                case 'temaMedia':
                    title = "Tema"
                    data = JsonTemaMedia;
                    break;
                case 'tema':
                    title = "Tema"
                    data = JsonTema;
                    break;
                case 'turno':
                    title = "Turno"
                    data = JsonTurno;
                    break;
                case 'media':
                    title = "Media"
                    data = JsonMediasTotal;
                    break;
                default:
                    break;
            }
            setTitle(title);
            setData(data);
        }, 200)
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
                            <option value="prioridade">Numero de chamadas por prioridade</option>
                            <option value="tema">Numero de chamadas por tema</option>
                            <option value="prioridadeMedia">Media de tempo por prioridade</option>
                            <option value="temaMedia">Media de tempo por tema</option>
                            <option value="turnoMedia">Media de tempo por turno</option>
                            <option value="media">Media de tempo total de conclusão de chamada</option>
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
