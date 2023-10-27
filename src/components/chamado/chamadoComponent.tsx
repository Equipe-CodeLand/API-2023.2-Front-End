import { useState } from 'react';
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoDropdown from './chamadoDropdown';

function ChamadoComponent(props: any) {
    let [open, setOpen] = useState(false)
    function toggleDropdown () {
        setOpen(!open)        
    }
    return(
        <div>
            <div className="chamado">
                <div className='left'>
                    <div>{'ID da chamada: '}{props.id}</div>
                    <div>{props.nome}</div>
                    <div>{props.tema}</div>
                </div>
                <div className='right'>
                    <div className={`status status-${props.status.id}`}>{props.status.texto}</div>
                    <div className={'status prioridade-cor' + props.prioridade.id}>{props.prioridade.value}</div>
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
            email={props.email}
            tipoUsuario={props.tipoUsuario}
            ></ChamadoDropdown>
        </div>
    )
}

export default ChamadoComponent