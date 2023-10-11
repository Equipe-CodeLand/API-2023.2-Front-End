import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import Header from "../components/header/headerComponent"

function Chamados() {
    let chamados: Array<Chamado> = [
        {id: 1, nome: 'Henrique Andrade', tema: 'Velocidade da Internet', status: { id: '4', texto: 'Encerrado'}, descricao: '', hora: '26/09/2023 00:59',
        conversa: [
            {remetente: 'Maria Silva', texto: `Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.`, role: 'Cliente'},
            {remetente: 'Henrique Andrade', texto: `Olá Maria Silva, lamentamos sinceramente por qualquer inconveniente que isso possa ter causado a você e entendemos a importância de uma conexão telefônica confiável em sua vida cotidiana.
            Quero assegurar a você que estamos dedicados a resolver esse problema o mais rápido possível. Após revisar seu relato, tomamos as seguintes providências:
            Agendamos uma visita técnica para verificar a qualidade da linha em sua residência. O técnico responsável estará programado para comparecer em 27 de agosto de 2023, conforme discutido.
            Estaremos monitorando de perto o progresso da visita técnica para garantir que o problema seja tratado de maneira adequada e eficaz.
            Em reconhecimento aos problemas que você enfrentou, creditaremos sua próxima fatura com um valor correspondente aos inconvenientes causados pela má qualidade da linha.`, role: 'Atendente'}
        ]
        },
            {id: 2, nome: 'Alice Nunes', tema: 'Problemas de Conexão', descricao: '', status: { id: '2', texto: 'Em andamento'}, hora: '26/09/2023 00:59',
            conversa: []
        },
            {id: 3, nome: 'Luís Oliveira', tema: 'Problemas com fatura', descricao: '', status: { id: '1', texto: 'Não iniciado'}, hora: '26/09/2023 00:59',
            conversa: []
        },
    ]

    let list = chamados.map(chamado => {
            return <ChamadoComponent
                id={chamado.id}
                nome={chamado.nome}
                tema={chamado.tema}
                status={chamado.status}
                hora={chamado.hora}
                conversa={chamado.conversa}
                descricao=""
            ></ChamadoComponent>
    })

    const link = ["/", "/", "/chamados"] // Link para as páginas
    const link_title = ["Iniciar Chamado", "Problemas Comuns", "Meus Chamados"] // titulo para as paginas

    return(
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

export default Chamados