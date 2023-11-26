import axios from "axios";
import { useEffect, useState } from "react";

export default function HomeAdministradorComponent(props:any){
    const [desc, setDesc] = useState('');
    const [tema_id, setTemaId] = useState('');
    const [solucao, setSolucao] = useState('');

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
        props.setProblemas(response.data);
    }

    async function deletarProblema(id) {
        await axios.delete(`/deletarProblemas/${id}`);
        // Atualizar a lista de problemas após a exclusão
        const response = await axios.get('/buscarProblemas');
        props.setProblemas(response.data);
    }
    return(
        <div>
            <section className="problemas">
                    <div key={props.id}>
                        <h3>{props.tema ? (<h3>{props.tema}</h3>) : (
                            <h3>Tema não especificado</h3>
                        )}</h3>
                        <ul>
                            <li>
                                <details>
                                    <summary title={props.desc}>{props.desc}</summary>
                                    <p>{props.solucao}</p>
                                    {/*<button onClick={() => editarProblema(props.id)}>Editar</button>
                                    <button onClick={() => deletarProblema(props.id)}>Deletar</button>*/}
                                </details>
                            </li>
                        </ul>
                    </div>
            </section>
        </div>
    )
}