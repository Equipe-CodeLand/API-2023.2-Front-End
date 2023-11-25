import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/cliente.css';

export default function Home() {
    const [problemas, setProblemas] = useState([]);

    useEffect(() => {
        // Buscar problemas existentes quando a página carrega
        axios.get('/buscarProblemas').then(response => setProblemas(response.data));
    }, []);

    return (
        <div className="homeCli">
            <section className="conteudo">
                <div>
                    <div className="titulo">
                        <h1 id="tituloPrincipal">Bem vindo ao <strong>Callnet</strong>!</h1>
                        <p>Faça chamadas com nossos atententes para solucionar seu problema!</p>
                    </div>
                    <div className="chamados">
                        <div className="acessar"><a href="/chamadosCli">Acessar meus chamados</a></div>
                        <div className="criar"><a href="/cadastroChamados">Criar um novo chamado</a></div>
                    </div>
                </div>
            </section>

            <section className="problemasComuns">
                <h2 id="titulo">Problemas Comuns</h2>
                <hr />
                {problemas.map((problema) => (
                    <div key={problema.id}>
                        <h3>{problema.tema}</h3>
                        <ul>
                            <li>
                                <details>
                                    <summary>{problema.desc}</summary>
                                    <p>{problema.solucao}</p>
                                </details>
                            </li>
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    );
}
