import Chamado from './chamado.interface'
import './style.css'
import { BsChevronDown } from 'react-icons/bs';

function ChamadoComponent(props: Chamado) {
    return(
        <div className="chamado">
            <div>{props.nome}</div>
            <div>{props.tema}</div>
            <div className='status'>{props.status}</div>
            <div>{props.hora}</div>
            <BsChevronDown className='icon'
            ></BsChevronDown>
        </div>
    )
}

export default ChamadoComponent