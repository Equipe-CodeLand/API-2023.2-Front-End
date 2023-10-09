import './style.css'
import { ChamadoAdmDetalhes } from './chamadoAdm.interface'
import { useState } from 'react'; // Importe o useState do React


function ChamadoAdmDropdown(props: any) {
    const [mostrarPopup, setMostrarPopup] = useState(false); // Estado para controlar a exibição do pop-up

    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const fecharPopup = () => {
        setMostrarPopup(false);
    }

    if (props.open) {
        let conversa = props.conversa.map((msg: ChamadoAdmDetalhes) => {
            return (
                <>
                    <div className='conteudo-adm'>
                        <p>{msg.email}</p>
                        <h2>{msg.nome + ' - Cliente'}</h2>
                        <p className='texto-adm'>{msg.msg}</p>

                    </div>
                    <button className='btn-adm' onClick={abrirPopup}>Atribuir atendente</button>
                </>
            )
        })

        if (conversa.length > 0) {
            return (
                <div className="chamado-dropdown">
                    {conversa}
                    {mostrarPopup && (
                        <div className="popup">
                            <table className="atendente-table">
                                <thead>
                                    <tr>
                                    <th>Atendente</th>
                                    <th>Chamados</th>
                                    <th>Atribuir Atendente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td className="atendente">Lucas Almeida</td>
                                    <td>0 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde" >Atribuir atendente</button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Matias Pereira</td>
                                    <td>1 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde">Atribuir atendente</button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Daniel Costa</td>
                                    <td>2 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde">Atribuir atendente</button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Felipe Ribeiro</td>
                                    <td>3 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde">Atribuir atendente</button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Rafaela Costa</td>
                                    <td>4 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde">Atribuir atendente</button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Isadora Barbosa</td>
                                    <td>4 Chamado(s) ativo(s) no momento</td>
                                    <td>
                                        <button className="botao-verde">Atribuir atendente</button>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            <button className='fechar_btn' onClick={fecharPopup}>Fechar Pop-up</button>
                        </div>
                    )}
                </div>
            )
        } return (<></>)
    } return (
        <></>
    )

}

export default ChamadoAdmDropdown
