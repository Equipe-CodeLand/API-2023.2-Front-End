import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import './style.css'

function ChamadoDropdown(props: any) {
    if (props.open) {
        let thread = (
            <div className='container-dropdown'>
                <p className='email-cliente'>{'E-mail: ' + props.email}</p>
                <h2 className='nome-cliente'>{props.nome}</h2>
                <p className='texto-adm'>{props.descricao}</p>
                <div className="cont">
                    <a href={`mailto:${props.email}`} className='btn'> Iniciar chamado </a>
                </div>
            </div>
        );
        console.log(props);

        if (props.descricao.length > 0) {
            return (
                <div className="chamado-ate-dropdown">
                    {thread}
                </div>
            )
        } return (<></>)
    } return (
        <></>
    )

}

export default ChamadoDropdown