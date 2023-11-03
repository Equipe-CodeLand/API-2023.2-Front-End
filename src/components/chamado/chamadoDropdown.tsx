import { Mensagem } from './mensagem.interface';
import { useState, useEffect } from 'react'
import { BiSend } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './style.css'

function ChamadoDropdown(props: any) {
    const [mensagem, setMensagem] = useState('');
    const [mensagemErro, setMensagemErro] = useState(false)
    const [mensagens, setMensagens] = useState<Mensagem[]>([])

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

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value == "cancelar-chamado") {
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
            if (e.target.value == "concluir-chamado") {
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

    if (props.open && mensagens.length > 0) {
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
                            <select className='select-chamado' onChange={handleSelect} style={{ display: 'block' }}>
                                <option value="" hidden>Gerenciar Chamado</option>
                                <option value="cancelar-chamado">Cancelar Chamado</option>
                                <option value="concluir-chamado">Concluir Chamado</option>
                            </select>

                            <button type="submit" value="enviar" className='btn-chamado' onClick={enviarMensagem} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 5 }}>Enviar Mensagem</span>
                                <BiSend style={{ fontSize: 25 }} />
                            </button>
                        </div>
                    </>}
                <div className="cont">
                    {(props.tipoUsuario === 'Atendente' && props.status.id == 1) &&
                        <a href={`mailto:${props.email}`} className='btn'> Iniciar chamado </a>
                    }
                    {(props.tipoUsuario === 'ADMIN' && props.status.id == 1) &&
                        <button className='btn-adm'>Atribuir atendente</button>
                    }
                </div>
            </div>
        )
    } return (
        <></>
    )

}

export default ChamadoDropdown