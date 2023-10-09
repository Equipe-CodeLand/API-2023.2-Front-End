import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import './style.css'

function ChamadoCliDropdown(props: any) {
    if(props.open) {
        let conversa = props.conversa.map((msg: { remetente: string; role: string; texto: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => {
            return (
                <div className='conteudo-cli'>
                    <h2>{msg.remetente + ' - ' + msg.role}</h2>
                    <p className='texto-cli'>{msg.texto}</p>
                </div>
            )
        })
        if(conversa.length > 0) {
            return(
                <div className="chamado-cli-dropdown">
                    {conversa}
                </div>
            )
        } return(<></>)
    } return(
        <></>
    )

}

export default ChamadoCliDropdown