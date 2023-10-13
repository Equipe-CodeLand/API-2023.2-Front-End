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
                        <a href={`mailto:${desc.email}`} className='btn'> Iniciar chamado </a>
                </div>
        
            )
        })

        if (conversa.length > 0){
            console.log(conversa);
            return (
                <div className='chamado-dropdown'>
                    {conversa}
                </div>
            )
        }
    }
    return(
        <></>
    )
}

export default ChamadoAteDropdown