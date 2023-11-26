import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/administrador.css';
import problemas from '../homes/chamadosfrequentes.png';
import atendentes from '../homes/atendentes.png';
import HomeAdministradorComponent from './homeAdmComponent';

export default function HomeAdministrador(props) {
    const [desc, setDesc] = useState('');
    const [tema_id, setTemaId] = useState('');
    const [solucao, setSolucao] = useState('');
    const [problemas, setProblemas] = useState([]);
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const problema = { desc, tema_id, solucao };
        console.log(problema)
        const response = await axios.put('http://localhost:5000/criarProblemas', problema);
        // Adicionar o novo problema à lista
        //props.setProblemas([...props.todosProblemas, response.data]);
        console.log(response)
        props.buscarProblemas()
    };

    useEffect(() => {
        axios.get('http://localhost:5000/buscarProblemas')
            .then(response => {console.log(response.data);
                 setProblemas(response.data)})
            .catch(error => console.error('Erro ao buscar problemas:', error));
    }, []);

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

            <section>
                <form onSubmit={handleSubmit}>
                    <label>
                        Descrição:
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </label>
                    <label>
                        Tema:
                        <select value={tema_id} onChange={(e) => setTemaId(e.target.value)}>
                            <option value="">Selecione o tema</option>
                            <option value="1">Sem acesso a Internet</option>
                            <option value="2">Modem</option>
                            <option value="4">Velocidade da Internet</option>
                        </select>
                    </label>
                    <label>
                        Solução:
                        <input type="text" value={solucao} onChange={(e) => setSolucao(e.target.value)} />
                    </label>
                    <button type="submit">Enviar</button>
                </form>
            </section>

            <h2 id="titulo">Problemas Comuns</h2>
            <hr />

            {/*<HomeAdministradorComponent>
            {problemas.map(problema =>(
                    <HomeAdministradorComponent
                    key={problema.id}
                    id = {problema.id}
                    tema = {problema.tema}
                    descricao = {problema.descricao}
                    problemas = {problema.solucao}
                    setProblemas = {setProblemas}
                    todosProblemas = {problemas}
                    editarProblema={editarProblema}
                    deletarProblema={deletarProblema}
                    />
                ))}
            </HomeAdministradorComponent>*/}

        </div>
    );
}
