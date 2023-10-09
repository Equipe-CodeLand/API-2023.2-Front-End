import { useState } from 'react';
import { ChamadoCli } from './chamadosCli.interface'
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoCliDropdown from './chamadosCliDropdown';

function ChamadoCliComponent(props: ChamadoCli) {
    let [open, setOpen] = useState(false)
    function toggleDropdown() {
        setOpen(!open)
    }
    return (
        <div>
            <div className="chamado">
                <div className='left'>
                    <div>{props.nome}</div>
                    <div>{props.tema}</div>
                </div>
                <div className='right'>
                    <div className={'status status-cor' + props.status.id}>{props.status.texto}</div>
                    <div>{props.hora}</div>
                    <BsChevronDown className='icon' onClick={toggleDropdown}
                    ></BsChevronDown>
                </div>
            </div>
            <ChamadoCliDropdown
                open={open}
                conversa={props.conversa}
            ></ChamadoCliDropdown>
        </div>
    )
}

export default ChamadoCliComponent