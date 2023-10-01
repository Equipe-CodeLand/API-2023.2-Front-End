import './style.css'
import { ChamadoAdmDetalhes } from './chamadoAdm.interface'

function ChamadoAdmDropdown(props: any) {
    if (props.open) {
        let conversa = props.conversa.map((msg: ChamadoAdmDetalhes) => {
            return (
                <>
                    <div className='conteudo-adm'>
                        <p>{msg.email}</p>
                        <h2>{msg.nome + ' - Cliente'}</h2>
                        <p className='texto-adm'>{msg.msg}</p>

                    </div>
                    <button className='btn-adm'>Atribuir atendente</button>
                </>
            )
        })
        if (conversa.length > 0) {
            return (
                <div className="chamado-dropdown">
                    {conversa}
                </div>
            )
        } return (<></>)
    } return (
        <></>
    )

}

export default ChamadoAdmDropdown