import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import Header from "../components/header/headerComponent"
import { useEffect, useState } from "react"
import axios from "axios"

function MeusChamados() {
    /* let chamados: Array<Chamado> = [
        {nome: 'Henrique Andrade', tema: 'Velocidade da Internet', status: { id: '1', texto: 'Encerrado'}, hora: '26/09/2023 00:59',
        conversa: [
            {remetente: 'Maria Silva', texto: `Nas últimas duas semanas, tenho notado ruídos estranhos durante minhas chamadas telefônicas. Esses ruídos tornaram difícil manter conversas claras e consistentes com meus amigos e familiares. Além disso, houve ocasiões em que as chamadas simplesmente caíram de forma inesperada, o que tem sido bastante frustrante.`, role: 'Cliente'},
            {remetente: 'Henrique Andrade', texto: `Olá Maria Silva, lamentamos sinceramente por qualquer inconveniente que isso possa ter causado a você e entendemos a importância de uma conexão telefônica confiável em sua vida cotidiana.
            Quero assegurar a você que estamos dedicados a resolver esse problema o mais rápido possível. Após revisar seu relato, tomamos as seguintes providências:
            Agendamos uma visita técnica para verificar a qualidade da linha em sua residência. O técnico responsável estará programado para comparecer em 27 de agosto de 2023, conforme discutido.
            Estaremos monitorando de perto o progresso da visita técnica para garantir que o problema seja tratado de maneira adequada e eficaz.
            Em reconhecimento aos problemas que você enfrentou, creditaremos sua próxima fatura com um valor correspondente aos inconvenientes causados pela má qualidade da linha.`, role: 'Atendente'}
        ]
        },
            {nome: 'Alice Nunes', tema: 'Problemas de Conexão', status: { id: '2', texto: 'Em andamento'}, hora: '26/09/2023 00:59',
            conversa: []
        },
            {nome: 'Luís Oliveira', tema: 'Problemas com fatura', status: { id: '3', texto: 'Não iniciado'}, hora: '26/09/2023 00:59',
            conversa: []
        },
    ] */
    const [chamados, setChamados] = useState<Chamado[]>([])
    const atendente_id: number = 2

    function buscarChamados() {
        axios.get(`http://localhost:5000/atendenteChamados/${atendente_id}`,)
            .then(res => {
                let chamados = res.data.map((c:any) => {
                    return {
                        id: c.cha_id,
                        nome: c.user_nome + ' ' + c.user_sobrenome,
                        tema: c.cha_tema,
                        status: {
                            id: c.sta_id,
                            texto: c.sta_nome
                        },
                        hora: c.cha_inicio,
                        descricao: c.cha_desc,
                        conversa: []
                    }
                })
                setChamados(chamados)
        }) 
    }

    useEffect(() => {
        buscarChamados()
    }, [])

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
            {chamados.length > 0 && (
                <div>
                    {   chamados.filter(chamado => chamado.status.texto !== 'Encerrado')
                        .map(chamado => {
                            console.log(chamado)
                            return <ChamadoComponent
                                id={chamado.id}
                                nome={chamado.nome}
                                tema={chamado.tema}
                                status={chamado.status}
                                prioridade={chamado.prioridade}
                                hora={chamado.hora}
                                email={chamado.email}
                                conversa={chamado.conversa}
                                descricao={chamado.descricao}
                                key={'chamado'+chamado.id}
                            ></ChamadoComponent>
                    })
                }
                </div>
            )}
        </div>
    )
}

export default MeusChamados