import './style.css'
import { ChamadoCliDetalhes } from './chamadosCli.interface'

function ChamadoCliDropdown(props: any) {
    if (props.open) {
        let conversa = props.conversa.map((msg: ChamadoCliDetalhes) => {
            return (
                <div className='conteudo-cli'>
                    <h2>{msg.remetente + ' - ' + msg.role}</h2>
                    <p className='texto-cli'>{msg.texto}</p>
                </div>
            )
        });

        if (conversa.length > 0) {
            return (
                <div className="chamado-cli-dropdown">
                    {conversa}
                    <br />
                    <button 
                    className='btn-cli'>Cancelar chamado</button>
                </div>
            )
        } 
    }
    
    return (
        <></>
    )
}

export default ChamadoCliDropdown
