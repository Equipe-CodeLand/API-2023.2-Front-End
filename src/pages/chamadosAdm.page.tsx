import ChamadoAdmComponent from "../components/chamado/chamadoAdmComponent"
import {ChamadoAdm} from "../components/chamado/chamadoAdm.interface"

export default function ChamadosAdm() {
    let chamados: Array<ChamadoAdm> = [
        {
            nome: 'Henrique Andrade', tema: 'Velocidade da Internet', status: { id: '1', texto: 'Encerrado' }, prioridade: { id: 3, value: "Baixo" }, hora: '26/09/2023 00:59', conversa: []
        },
        {
            nome: 'Alice Nunes', tema: 'Problemas de Conexão', status: { id: '2', texto: 'Em andamento' }, prioridade: { id: 1, value: "Alta" }, hora: '26/09/2023 00:59', conversa: []
        },
        {
            nome: 'Luís Oliveira', tema: 'Problemas com fatura', status: { id: '3', texto: 'Não iniciado' }, prioridade: { id: 2, value: "Média" }, hora: '26/09/2023 00:59', conversa: [{nome: 'Luís Oliveira', email: 'email@email.com', msg: 'Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.'}]
        },
    ]


    let list = chamados.map((chamado: any) => {
        return <ChamadoAdmComponent
            nome={chamado.nome}
            tema={chamado.tema}
            status={chamado.status}
            prioridade={chamado.prioridade}
            hora={chamado.hora}
            conversa={chamado.conversa}
        ></ChamadoAdmComponent>
    })
    return (
        <div>
            {list}
        </div>
    )
}