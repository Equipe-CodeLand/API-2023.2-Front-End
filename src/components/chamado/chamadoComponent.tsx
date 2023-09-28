import { useState } from 'react';
import Chamado from './chamado.interface'
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoDropdown from './chamadoDropdown';

function ChamadoComponent(props: Chamado) {
    let [open, setOpen] = useState(false)
    function toggleDropdown () {
        setOpen(!open)        
    }
    return(
        <div>
            <div className="chamado">
                <div className='left'>
                    <div>{props.nome}</div>
                    <div>{props.tema}</div>
                </div>
                <div className='right'>
                    <div className={'status status-cor'+props.status.id}>{props.status.texto}</div>
                    <div>{props.hora}</div>
                    <BsChevronDown className='icon' onClick={toggleDropdown}
                    ></BsChevronDown>
                </div>
            </div>
            <ChamadoDropdown 
            open={open}
            conversa={props.conversa}
            ></ChamadoDropdown>
        </div>
    )
}

export default ChamadoComponent