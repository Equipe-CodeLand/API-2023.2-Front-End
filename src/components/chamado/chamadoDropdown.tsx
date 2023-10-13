import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import './style.css'

function ChamadoDropdown(props: any) {
    if (props.open) {
        let thread = (
            <div>
                <p>{props.email}</p>
                <h2>{props.nome}</h2>
                <p className='texto-adm'>{props.descricao}</p>
                <a href={`mailto:${props.email}`} className='btn'> Iniciar chamado </a>
            </div>
        );
        console.log(props);
        
        if(props.descricao.length > 0) {
            return(
                <div className="chamado-ate-dropdown">
                    {thread}
                </div>
            )
        } return(<></>)
    } return(
        <></>
    )

}

export default ChamadoDropdown