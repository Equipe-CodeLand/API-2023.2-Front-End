import './style.css'
import { ChamadoAteDetalhes } from './chamadoAte.interface'



function ChamadoAteDropdown(props:any){
    if (props.open) {
        let conversa = props.conversa.map((desc: ChamadoAteDetalhes) =>{
            return(
                <div className='conteudo'>
                        <p>{desc.email}</p>
                        <h2>{desc.nome + ' - Cliente'}</h2>
                        <p className='texto-adm'>{desc.desc}</p>
                </div>
        
            )
        })

        if (conversa.length > 0){
            return(
                <div className='chamado-dropdown'>
                    {conversa}
                    <button className='btn'>Iniciar chamada</button>
                </div>
            )
        }
    }
    return(
        <></>
    )
}

export default ChamadoAteDropdown