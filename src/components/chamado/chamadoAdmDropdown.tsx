import React, { useState } from 'react';
import { ChamadoAdmDetalhes } from './chamadoAdm.interface';
import axios from 'axios'; // Importe o axios
import './style.css';

function ChamadoAdmDropdown(props: any) {
    const [mostrarPopup, setMostrarPopup] = useState(false); // Estado para controlar a exibição do pop-up

    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const fecharPopup = () => {
        setMostrarPopup(false);
    }

    const atribuirAtendente = (atendenteId: number) => {
        // Aqui você pode usar o axios para fazer uma requisição
        axios.post(`http://localhost:5000/atribuirAtendente/${atendenteId}`, { chamadoId: props.chamadoId })
            .then(response => {
                // Atualize o estado ou faça qualquer outra ação necessária
                console.log("Atendente atribuído com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao atribuir atendente:", error);
            });
    }

    if (props.open) {
        let conversa = props.conversa.map((msg: ChamadoAdmDetalhes) => {
            return (
                <>
                    <div className='conteudo-adm'>
                        <p>{msg.email}</p>
                        <h2>{msg.nome + ' - Cliente'}</h2>
                        <p className='texto-adm'>{msg.msg}</p>
                    </div>
                    <button className='btn-adm' onClick={abrirPopup}>Atribuir atendente</button>
                </>
            )
        })

        if (conversa.length > 0) {
            return (
                <div className="chamado-dropdown">
                    {conversa}
                    {mostrarPopup && (
                        <div id='meu-modal' className="modal">
                            <div className="modal-content">
                                <br></br>
                                <table className="atendente-table">
                                    <thead>
                                        <tr>
                                            <th>Atendente</th>
                                            <th>Chamados</th>
                                            <th>Atribuir Atendente</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Lucas Almeida</td>
                                            <td>0 Chamado(s) ativo(s) no momento</td>
                                            <td>
                                                <button className="botao-verde" onClick={() => atribuirAtendente(1)}>Atribuir atendente</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br></br>
                                <button className='fechar_btn' onClick={fecharPopup}>Fechar</button>
                            </div>
                        </div>
                    )}
                </div>
            )
        } 
        return (<></>)
    } 
    return (
        <></>
    )
}

export default ChamadoAdmDropdown;
