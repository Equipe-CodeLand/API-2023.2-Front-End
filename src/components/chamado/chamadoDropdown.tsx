import { Mensagem } from './mensagem.interface';
import { useState, useEffect } from 'react'
import { BiSend } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './style.css'
import Atendente from './Atendente.interface';

function ChamadoDropdown(props: any) {
    const [mensagem, setMensagem] = useState('');
    const [mensagemErro, setMensagemErro] = useState(false)
    const [mensagens, setMensagens] = useState<Mensagem[]>([])
    const [mostrarPopup, setMostrarPopup] = useState(false); // Estado para controlar a exibição do pop-up


    const fecharPopup = () => {
        setMostrarPopup(false);
    }
    const [atendentes, setAtendentes] = useState<Atendente[]>([])

    function buscarMensagens() {
        axios.get(`http://localhost:5000/chamados/${props.id}/mensagens`)
            .then(res => {
                let mensagens = res.data.map((msg: any) => {
                    let nome = msg.usuario && msg.usuario.nome;
                    let sobrenome = msg.usuario && msg.usuario.sobrenome;

                    return {
                        id: msg.id,
                        usuario: (nome && sobrenome) ? nome + ' ' + sobrenome : '',
                        horaEnvio: new Date(msg.hora).toLocaleDateString() + " - " + new Date(msg.hora).toLocaleTimeString(),
                        texto: msg.texto,
                        tipoUsuario: msg.tipoUsuario
                    }
                })

                setMensagens(mensagens);
            })
    }

    useEffect(() => {
        buscarMensagens()
    }, [])

    function buscarAtendentes() {
        axios.get(`http://localhost:5000/atendentes`,)
            .then(res => {
                let atendentes = res.data.map((atendente:any) => {
                    return {
                        id: atendente.id,
                        nome: atendente.usuario.nome + ' ' + atendente.usuario.sobrenome,
                    }
                })
                setAtendentes(atendentes)
        }) 
    }
    const abrirPopup = () => {
        setMostrarPopup(true);
        buscarAtendentes();
    }

    function atribuirAtendente(atendenteId){
        console.log(props.id);
        // Aqui você pode usar o axios para fazer uma requisição
        axios.post(`http://localhost:5000/atribuirAtendente`, { chamadoId: props.id, atendenteId: atendenteId })
            .then(response => {
                // Atualize o estado ou faça qualquer outra ação necessária
                console.log("Atendente atribuído com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao atribuir atendente:", error);
            });
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "cancelar-chamado") {
            const data = {
                idChamado: props.id,
                idStatus: 3
            }

            axios.put('http://localhost:5000/chamado/finalizarChamado', data).then(res => {
                console.log(res)
                window.location.reload()
                buscarMensagens()
            })
        } else {
            if (e.target.value === "concluir-chamado") {
                const data = {
                    idChamado: props.id,
                    idStatus: 4
                }

                axios.put('http://localhost:5000/chamado/finalizarChamado', data).then(res => {
                    console.log(res)
                    window.location.reload()
                    buscarMensagens()
                })
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNome = e.target.value;
        setMensagem(newNome);
        setMensagemErro(false)
    };

    const enviarMensagem = () => {
        try {
            if (!mensagem) {
                setMensagemErro(true)
            }
            else {
                let data = {
                    texto: mensagem,
                    idUsuario: jwtDecode(localStorage.getItem('token') || '')['userId'],
                    idChamado: props.id,
                    tipoUsuario: jwtDecode(localStorage.getItem('token') || '')['cargo']
                }

                axios.post('http://localhost:5000/chamado/enviarMensagem', data)
                    .then(res => {
                        axios.put('http://localhost:5000/chamado/andamentoChamado', { idChamado: props.id }).then(res => {
                            window.location.reload()
                            buscarMensagens()
                            setMensagem('')
                        })
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (props.open) {
        let thread = mensagens.map(msg => {
            return (
                <div key={'msg' + msg.id}>
                    <h2 className='nome-cliente'>{msg.usuario + ' - ' + msg.tipoUsuario}</h2>
                    <p className='texto-adm'>{msg.texto}</p>
                </div>
            )
        })


        return (
            <div className="chamado-ate-dropdown">
                {thread}

                {props.status.id == 3 || props.status.id == 4 ?
                    null
                    :
                    <>
                        <input name="input-mensagem" placeholder="Digite sua mensagem" type="text" value={mensagem} onChange={handleChange} />

                        {mensagemErro && <p className='erro'>Campo obrigatório</p>}

                        <div className="select-botao">
                            {jwtDecode(localStorage.getItem('token') || '')['cargo'] !== 'Cliente'&&

                                <select className='select-chamado' onChange={handleSelect} style={{ display: 'block' }}>
                                <option value="" hidden>Gerenciar Chamado</option>
                                <option value="cancelar-chamado">Cancelar Chamado</option>
                                <option value="concluir-chamado">Concluir Chamado</option>
                            </select>}

                            <button type="submit" value="enviar" className='btn-chamado' onClick={enviarMensagem} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 5 }}>Enviar Mensagem</span>
                                <BiSend style={{ fontSize: 25 }} />
                            </button>
                        </div>
                    </>}
                <div className="cont">
                    {jwtDecode(localStorage.getItem('token') || '')['cargo'] === 'Administrador'&&
                        <>
                        {!mostrarPopup && <button onClick={abrirPopup} className='btn-adm'>Atribuir atendente</button>}
                        <div>
                            {mostrarPopup && (
                                <div id='meu-modal' className="modal">
                                    <div className="modal-content">
                                        <br></br>
                                        <table className="atendente-table">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Atendentes</th>
                                                    <th>Atribuir Atendente</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {atendentes.map(atendente=> {
                                                    console.log(atendente);
                                                    return (
                                                        <tr>
                                                            <td>{atendente.id}</td>
                                                            <td>{atendente.nome}</td>
                                                            <td>
                                                                <button className="btn" onClick={() => atribuirAtendente(atendente.id)}>Atribuir atendente</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                
                                                } )}

                                            </tbody>
                                        </table>
                                        <br></br>
                                        <button className='fechar_btn' onClick={fecharPopup}>Fechar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                    }
                </div>
            </div>
        )
    } return (
        <></>
    )

}

export default ChamadoDropdown
