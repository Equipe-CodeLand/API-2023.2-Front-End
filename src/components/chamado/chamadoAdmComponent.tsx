import { useState } from 'react';
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoAdmDropdown from './chamadoAdmDropdown';
import { ChamadoAdm } from './chamadoAdm.interface';

function ChamadoAdmComponent(props: ChamadoAdm) {
    let [open, setOpen] = useState(false)
    function toggleDropdown() {
        setOpen(!open)
    }
    return (
        <div>
            <div className="chamado">
                <div className='left'>
                    <div>{props.id}</div>
                    <div>{props.nome}</div>
                    <div>{props.tema.texto}</div>
                </div>
                <div className='right'>
                    <div className={'status status-cor' + props.status.id}>{props.status.texto}</div>
                    <div className={'status prioridade-cor' + props.prioridade.id}>{props.prioridade.value}</div>
                    <div>{props.hora}</div>

                    {props.conversa.length > 0 ?
                        <BsChevronDown className='icon' onClick={toggleDropdown}
                        ></BsChevronDown>
                        :
                        <div style={{marginRight: 30}} />
                    }
                </div>
            </div>
            <ChamadoAdmDropdown
                open={open}
                conversa={props.conversa}
            ></ChamadoAdmDropdown>
        </div>
    )
}

export default ChamadoAdmComponent