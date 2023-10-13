import ChamadoAdmComponent from "../components/chamado/chamadoAdmComponent"
import {ChamadoAdm} from "../components/chamado/chamadoAdm.interface"
import Header from "../components/header/headerComponent"

export default function ChamadosAdm() {
    let chamados: Array<ChamadoAdm> = [
        {
            nome: 'Alice Nunes', tema: 'Problema de Conexão', status: { id: '3', texto: 'Não iniciado' }, prioridade: { id: 3, value: "Baixa" }, hora: '26/09/2023 00:59', conversa: [{nome: 'Alice Nunes', email: 'alicenunes@gmail.com', msg: 'Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.'}]
        },       
        {
            nome: 'Leonardo Pereira', tema: 'Qualidade de linha', status: { id: '3', texto: 'Não iniciado' }, prioridade: { id: 2, value: "Média" }, hora: '26/09/2023 00:59', conversa: [{nome: 'Leonardo Pereira', email: 'leopereira@gmail.com', msg: 'Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.'}]
        },
        {
            nome: 'Luís Oliveira', tema: 'Problemas com fatura', status: { id: '3', texto: 'Não iniciado' }, prioridade: { id: 1, value: "Alta" }, hora: '26/09/2023 00:59', conversa: [{nome: 'Luís Oliveira', email: 'luisoliveira@gmail.com', msg: 'Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.'}]
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

    const link = ["/", "/", "/cadastroUser"] // Link para as páginas
    const link_title = ["Relatórios", "Chamadas em Aberto", "Cadastrar Usuário"] // titulo para as paginas

    return (
        <div>
            <Header
                link_0 = {link[0]} // Link para as páginas
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_title_0 = {link_title[0]} // titulo para as paginas
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
            />
            {list}
        </div>
    )
}