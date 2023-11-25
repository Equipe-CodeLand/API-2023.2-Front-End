import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/administrador.css';
import problemas from '../homes/chamadosfrequentes.png';
import atendentes from '../homes/atendentes.png';

export default function HomePageAdministrador() {
    const [desc, setDesc] = useState('');
    const [tema_id, setTemaId] = useState('');
    const [solucao, setSolucao] = useState('');
    const [problemas, setProblemas] = useState([]);

    useEffect(() => {
        // Buscar problemas existentes quando a página carrega
        axios.get('/buscarProblemas').then(response => setProblemas(response.data));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const problema = { desc, tema_id, solucao };
        const response = await axios.post('/criarProblemas', problema);
        // Adicionar o novo problema à lista
        setProblemas([...problemas, response.data]);
    };

    async function atualizarProblemas(id, desc, tema_id, solucao) {
        const response = await axios.put(`/atualizarProblemas/${id}`, { desc, tema_id, solucao });
        return response.data;
    }

    async function editarProblema(id) {
        const desc = prompt('Digite a nova descrição do problema:');
        const tema_id = prompt('Digite o novo ID do tema:');
        const solucao = prompt('Digite a nova solução:');
        await atualizarProblemas(id, desc, tema_id, solucao);
        // Atualizar a lista de problemas após a edição
        const response = await axios.get('/buscarProblemas');
        setProblemas(response.data);
    }

    async function deletarProblema(id) {
        await axios.delete(`/deletarProblemas/${id}`);
        // Atualizar a lista de problemas após a exclusão
        const response = await axios.get('/buscarProblemas');
        setProblemas(response.data);
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
                <hr />
                <div className="graficos">
                </div>
            </section>

            <section className="problemas">
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
                                    <button onClick={() => editarProblema(problema.id)}>Editar</button>
                                    <button onClick={() => deletarProblema(problema.id)}>Deletar</button>
                                </details>
                            </li>
                        </ul>
                    </div>
                ))}

                <form onSubmit={handleSubmit}>
                    <label>
                        Descrição:
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </label>
                    <label>
                        Tema:
                        <select value={tema_id} onChange={(e) => setTemaId(e.target.value)}>
                            <option value="1">Modem</option>
                            <option value="2">Velocidade da Internet</option>
                            <option value="3">Sem conexão com a Internet</option>
                        </select>
                    </label>
                    <label>
                        Solução:
                        <input type="text" value={solucao} onChange={(e) => setSolucao(e.target.value)} />
                    </label>
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </div>
    );
}
