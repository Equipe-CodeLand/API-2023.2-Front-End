import { ChamadoAte } from "../components/chamadoAte/chamadoAte.interface";
import Header from "../components/header/headerComponent";
import ChamadoAteComponent from "../components/chamadoAte/chamadoAteComponent";

export default function ChamadosAte() {
    let chamados: Array<ChamadoAte> = [
        {
            nome: 'Henrique Andrade', 
            tema: 'Velocidade da Internet', 
            status: { id: '3', texto: 'Chamada aberta' }, 
            prioridade: { id: 3, value: "Baixo" }, 
            hora: '26/09/2023 00:59', 
            descricao: [{
                nome: 'Henrique Andrade',
                email: 'henriqueand@email.com',
                desc: 'desc example 1'
            }]
        },
        {
            nome: 'Alice Nunes', 
            tema: 'Problemas de Conexão', 
            status: { id: '3', texto: 'Chamada aberta' }, 
            prioridade: { id: 1, value: "Alta" }, 
            hora: '26/09/2023 00:59', 
            descricao: [{
                nome: 'Alice Nunes',
                email: 'nunes.alice@email.com',
                desc: ''
            }]
        },
        {
            nome: 'Luís Oliveira', 
            tema: 'Problemas com fatura', 
            status: { id: '3', texto: 'Chamada aberta' }, 
            prioridade: { id: 2, value: "Média" }, 
            hora: '26/09/2023 00:59', 
            descricao: [{
                nome: 'Luís Oliveira', 
                email: 'email@email.com', 
                desc: 'Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.'}]
        },
    ]

    let list = chamados.map((chamado: any) => {
        return <ChamadoAteComponent
            nome={chamado.nome}
            tema={chamado.tema}
            status={chamado.status}
            prioridade={chamado.prioridade}
            hora={chamado.hora}
            descricao={chamado.descricao}
        ></ChamadoAteComponent>
    })

    const link = ["/", "/", "/"]
    const link_title = ["option 1", "option 2", "option 3"]

    return(
        <div>
            <Header
            link_0 = {link[0]} 
            link_1 = {link[1]}
            link_2 = {link[2]}
            link_title_0 = {link_title[0]}
            link_title_1 = {link_title[1]}
            link_title_2 = {link_title[2]}
            />
            {list}

        </div>
     )
}