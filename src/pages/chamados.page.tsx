import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"

function Chamados() {
    let chamados: Array<Chamado> = [
        {nome: 'Henrique Andrade', tema: 'Velocidade da Internet', status: 'Em andamento', hora: '26/09/2023 00:59'},
        {nome: 'Alice Nunes', tema: 'Problemas de Conexão', status: 'Em andamento', hora: '26/09/2023 00:59'},
        {nome: 'Luís Oliveira', tema: 'Problemas com fatura', status: 'Em andamento', hora: '26/09/2023 00:59'},
    ]
    let list = chamados.map(chamado => {
            return <ChamadoComponent
                nome={chamado.nome}
                tema={chamado.tema}
                status={chamado.status}
                hora={chamado.hora}
            ></ChamadoComponent>
    })
    return(
        <div>
            {list}
        </div>
    )
}

export default Chamados