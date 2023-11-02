import { useState, useEffect } from 'react'
import './style.css'
import Mensagem from './mensagem.interface';
import axios from 'axios';

function ChamadoDropdown(props: any) {

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

    if (props.open && mensagens.length > 0) {
        let thread = mensagens.map(msg => {
            return(
                <div key={'msg'+msg.id}>
                    <h2 className='nome-cliente'>{msg.usuario + ' - ' + msg.tipoUsuario}</h2>
                    <p className='texto-adm'>{msg.texto}</p>
                </div>
            )
        })

       
        return (
                <div className="chamado-ate-dropdown">              
                    {thread}
                    {/* colocar caixa de  e botão de enviar se for usuario com id incluso no chamado e o chamado estiver em andamento*/}
                    {/* colocar botões de encerrar chamada se for atendente e chamado estiver em andamento */}
                    <div className="cont">
                        {(props.tipoUsuario === 'Atendente' && props.status.id == 1) && 
                            <a href={`mailto:${props.email}`} className='btn'> Iniciar chamado </a>
                        }
                        {(props.tipoUsuario === 'Administrador' && props.status.id == 1) &&
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