import { useState } from 'react';
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoDropdown from './chamadoDropdown';
import { jwtDecode } from 'jwt-decode';

function ChamadoComponent(props: any) {
    let [open, setOpen] = useState(false)
    function toggleDropdown () {
        setOpen(!open)        
    }
    return(
        <div>
            <div className="chamado">
                <div className='left'>
                    <div>{props.id}</div>
                    <div>{props.nome}</div>
                    <div>{props.tema.texto}</div>
                </div>
                <div className='right'>
                    <div className={`status status-${props.status.id}`}>{props.status.texto}</div>
                    {jwtDecode(localStorage.getItem('token') || '')['cargo'] !== 'Cliente'&&
                        <div className={'status prioridade-cor' + props.prioridade.id}>{props.prioridade.value}</div>
                    }
                    <div>{props.hora}</div>
                    <BsChevronDown className='icon' onClick={toggleDropdown}
                    ></BsChevronDown>
                </div>
            </div>
            <ChamadoDropdown 
            open={open}
            id={props.id}
            nome={props.nome}
            status={props.status}
            descricao={props.descricao}
            tipoUsuario={props.tipoUsuario}
            >
            </ChamadoDropdown>
        </div>
    )
}

export default ChamadoComponent