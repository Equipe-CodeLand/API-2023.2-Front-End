import { useState } from 'react';
import './style.css'
import { BsChevronDown } from 'react-icons/bs';
import ChamadoAteDropdown from './chamadoAteDropdown';
import { ChamadoAte } from './chamadoAte.interface';

function ChamadoAteComponent(props: ChamadoAte) {
    let [open, setOpen] = useState(false);

    function toggleDropdown() {
        setOpen(!open);
    }

    return (
        <div>
            <div className='chamado'>
                <div className='left'>
                    <div>{'ID da chamada:'}{props.id}</div>
                    <div>{props.nome}</div>
                    <div>{props.tema}</div>
                </div>

                <div className='right'>

                    <div className={'status status-cor' + props.status.id}>
                        {props.status.texto}
                    </div>

                    <div className={'status prioridade-cor' + props.prioridade.id}>
                        {props.prioridade.value}
                    </div>
                    
                    <div>{props.hora}</div>

                    {props.descricao.length > 0 ?
                        <BsChevronDown className='icon' onClick={toggleDropdown} />
                        :
                        <div style={{ marginRight: 30 }} />
                    }
                </div>
            </div>
            <ChamadoAteDropdown
                open={open}
                conversa={props.descricao}
            />
        </div>
    )
}

export default ChamadoAteComponent;