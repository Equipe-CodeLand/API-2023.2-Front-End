import { useState } from "react";
import "./styles/administrador.css";
import Grafico from "../graficos/graficos";

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

export default function HomePageAdministrador() {
    const [tema, setTema] = useState('prioridade');
    const [data, setData] = useState(JsonPrioridade);
    const [title, setTitle] = useState('Prioridade');
    
    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
    }

    const handleSubmit = () => {
        let title:string = ""
        let data:any = ""
        switch (tema) {
            case 'prioridade':
                title = "Prioridade"
                data = JsonPrioridade;
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
                        <input type="date" id="inicio" />
                    </div>
                    <div className="final">
                        <label htmlFor="">Data final</label>
                        <input type="date" id="final" />
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
