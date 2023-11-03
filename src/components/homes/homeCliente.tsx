import "./styles/cliente.css"

export default function Home() {
    return (
        <div className="homeCli">
            <section className="conteudo">
                <div>
                    <div className="titulo">
                        <h1 id="tituloPrincipal">Bem vindo ao <strong>Callnet</strong>!</h1>
                        <p>Faça chamadas com nossos atententes para solucionar seu problema!</p>
                    </div>
                    <div className="chamados">
                        <div className="acessar"><a href="/chamadoCli">Acessar meus chamados</a></div>
                        <div className="criar"><a href="/criarChamados">Criar um novo chamado</a></div>
                    </div>
                </div>
            </section>
            <section className="problemasComuns">
                <h2 id="titulo">Problemas Comuns</h2>
                <hr />
                <div className="problema 1">
                    <h3>Velocidade da Internet</h3>
                    <ul>
                        <li>
                            <details>
                                <summary>Ao conectar à internet, aparece velocidade diferente da contratada, porque isso acontece?</summary>
                                <p>Fatores relacionados a isso:
                                    <ul>
                                        <li>A capacidade máxima da velocidade recebida pela placa de rede;</li>
                                        <li>Repetidor de mercado que pode comprometer a quantidade da velocidade;</li>
                                        <li>Roteador instalado perto de aparelhos sem fio que podem interferir no sinal;</li>
                                        <li>Longa distância do roteador com o aparelho conectado;</li>
                                        <li>Barreiras físicas;</li>
                                        <li>Interferência de sinal causada por outros aparelhos;</li>
                                        <li>Muitas pessoas conectadas ao mesmo tempo;</li>
                                        <li>Qualidade da fiação do imóvel;</li>
                                        <li>Capacidade do processamento do computador.</li>
                                    </ul>
                                </p>
                                
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Wifi-Lento</summary>
                                <p>Posicione o roteador em um local central da casa, longe de obstruções. Evite interfêrencias de dispositivos eletrônicos e mantenha o firmware do roteador atualizado. Considere investir em um roteador mais potente se necessário.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Problemas de Interferência</summary>
                                <p>Mude o canal Wi-Fi para um menos congestinado nas configurações do roteador</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Downloads ou streming lentos em horários de pico</summary>
                                <p>Experimente usar a internet em horários menos congestinados, se possivel, considere a possibilidade de fazer upgrade no plano com maior largura de banda.</p>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="problema 2">
                    <h3>Moldem</h3>
                    <ul>
                        <li>
                            <details>
                                <summary>Não consigo conectar a Internet quando a luz do modem está piscando ou apagada.</summary>
                                <p>Se a luz do modem está piscando, ela indica instabilidade no sinal, e se está apagada, demonstra a interrupção da transmissão do sinal. Para tentar arrumar, é preciso desligar o modem e reiniciá-lo após alguns segundos.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Luzes indicadoras do modem não estão acessas</summary>
                                <p>Verifique se o modem está corretamente ligado na tomada e se o cabo de energia está funcionando. Tente usar outra tomada, se possível. Se as luzes ainda não acenderem, o modem pode estar com defeito.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Problemas do aquecimento do modem</summary>
                                <p>Certifique-se de que o modem tenha espaço suficiente ao redor para ventilação adequada. Evite colocá-lo em um local exposto à luz solar direta ou próximo de fontes de calor.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Meu sinal está fraco</summary>
                                <p>Posicione o modem em um local central da casa para obter o melhor alcance de sinal. Considere a possibilidade de usar repetidores ou extensores de sinal Wi-Fi, se necessário.</p>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="problema 3">
                    <h3>Sem acesso á internet</h3>
                    <ul>
                        <li>
                            <details>
                                <summary>Minha internet está ruim</summary>
                                <p>Use um site confiável de teste de velocidade para verificar a velocidade atual da sua conexão. Se o problema persistir entre em contato com o suporte técnico do seu provedor de serviços de Internet.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Estou sem acesso à internet</summary>
                                <p>Verifique o site ou as redes sociais do seu provedor de serviços de Internet para ver se há relatos de interrupções na sua área.</p>
                                <p>Conecte um dispositivo diretamente ao modem usando um cabo Ethernet para ver se você obtém acesso à Internet. Se o problema persistir entre em contato com o provedor da sua Internet.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Não estou conseguindo acessar minha rede WIFI</summary>
                                <p>Desligue o modem e reinicie após uns segundos, após isso, espere até as luzes do modem acenderem e tente conectar novamente.</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Minha internet não está funcionando</summary>
                                <p>Se ocorrer lentidão, ou alguma outra dificuldade relacionada à conexão, desligue o equipamento da energia elétrica por cerca de 2 minutos. Se o problema persistir, entre em contato com o suporte técnico.</p>
                            </details>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}