import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import './style.css'

function ChamadoDropdown(props: any) {
    if(props.open) {
        let conversa = props.conversa.map((msg: { remetente: string; role: string; texto: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => {
            return (
                <div className='conteudo'>
                    <h2>{msg.remetente + ' - ' + msg.role}</h2>
                    <p className='texto'>{msg.texto}</p>
                </div>
            )
        })
        if(conversa.length > 0) {
            return(
                <div className="chamado-dropdown">
                    {conversa}
                </div>
            )
        } return(<></>)
    } return(
        <></>
    )

}

export default ChamadoDropdown