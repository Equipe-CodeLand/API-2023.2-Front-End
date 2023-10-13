import ChamadoCliComponent from "../components/chamadoCli/chamadoCliComponent"
import { ChamadoCli } from "../components/chamadoCli/chamadosCli.interface"
import Header from "../components/header/headerComponent"

export default function ChamadosCli() {
    let chamados: Array<ChamadoCli> = [
        {
            nome: '-', tema: 'Velocidade da Internet', status: { id: '1', texto: 'Não iniciado' }, hora: '26/09/2023 00:59', conversa: [{remetente: 'Bruno Castilho',role: "Cliente", texto: 'Minha internet tem estado lenta no últimos três dias e não consigo arrumar. Estou bastante frustrado e gostaria de um atendimento com urgência pois está atrapalhando a realização do meu trabalho remoto mas ninguém me auxiliou ainda!!'}]
        },
        {
            nome: 'Alice Nunes', tema: 'Problemas de Conexão', status: { id: '2', texto: 'Em andamento' }, hora: '26/09/2023 00:59', conversa: [{remetente: 'Bruno Castilho', role: 'Cliente', texto: 'Minha internet tem estado lenta no últimos três dias e não consigo arrumar. Estou bastante frustrado e gostaria de um atendimento com urgência pois está atrapalhando a realização do meu trabalho remoto.'}, {remetente: 'Alice Nunes',role: 'Atendente', texto: 'Olá, Bruno! Tente desativar o aparelho da tomada por um minuto e ligar novamente.'}]
        },
        {
            nome: 'Luís Oliveira', tema: 'Problemas com fatura', status: { id: '3', texto: 'Encerrado' }, hora: '26/09/2023 00:59', conversa: [{remetente: 'Bruno Castilho', role: 'Cliente', texto: 'Minha internet tem estado lenta no últimos três dias e não consigo arrumar. Estou bastante frustrado e gostaria de um atendimento com urgência pois está atrapalhando a realização do meu trabalho remoto.'}, {remetente: 'Luís Oliveira', role: 'Atendente', texto: 'Olá, Bruno! Tente desativar o aparelho da tomada por um minuto e ligar novamente.'}, {remetente: "Bruno Castilho", role: "Cliente", texto: "Funcionou!!"}]
        },
    ]


    let list = chamados.map((chamado: any) => {
        return <ChamadoCliComponent
            nome={chamado.nome}
            tema={chamado.tema}
            status={chamado.status}
            hora={chamado.hora}
            conversa={chamado.conversa}
        ></ChamadoCliComponent>
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