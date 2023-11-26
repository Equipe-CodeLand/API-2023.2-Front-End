import { useEffect, useState } from "react"
import { Problema, Problemas, NovaSolucao } from "../cadastroSolucao/solucao.interface"
import axios from "axios"
import "./problemas.css"
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


export default function ProblemasSolucoes() {
    const navigate = useNavigate()

    const [controle, setControle] = useState(false)
    const [newSolucao, setNewSolucao] = useState('')
    const [solucaoDesc, setSolucaoDesc] = useState('')
    const [visible, setVisible] = useState([])
    const [visibleSolu, setVisibleSolu] = useState([])
    const [solucao, setSolucao] = useState<NovaSolucao>()
    const [problemas, setProblemas] = useState<Problemas>()

    useEffect(() => {
        axios.get("http://localhost:5000/buscarProblemas")
            .then((resposta) => {
                setProblemas(resposta.data)
                setControle(!controle)
            })
    }, [controle])

    const handleDeleteSolucao = (id: number) => {
        axios.delete(`http://localhost:5000/deletarSolucoes/${id}`)
            .then(() => setControle(!controle))
    }

    const handleDeleteProblema = (id: number) => {
        axios.delete(`http://localhost:5000/deletarProblemas/${id}`)
            .then(() => setControle(!controle))
    }

    const handleAdd = (desc: string, id: number) => {
        axios.post(`http://localhost:5000/criarSolucoes/${id}`, {
            desc: desc,
        })
            .then(() => setControle(!controle))

        setNewSolucao('')
        setVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }

    const handleUpdateSolu = (desc: string, id: number) => {
        axios.put(`http://localhost:5000/atualizarSolucoes/${id}`, {
            desc: desc,
        })
            .then(() => setControle(!controle))

        setSolucaoDesc('')
        setVisibleSolu((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }

    const handleChange = (e: any) => {
        const newMensagem = e.target.value;
        setNewSolucao(newMensagem);
    };

    const handleUpdate = (e: any) => {
        const newDesc = e.target.value;
        setSolucaoDesc(newDesc);
    };

    const toggleSolucao = (id: number) => {
        setVisibleSolu((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const toggleInput = (id: number) => {
        setVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className="homeCli">
            <section className="problemasComuns">
                <h2 id="titulo">Problemas Comuns</h2>
                <hr />

                <div className="problema">
                    <h3>Sem Acesso à internet</h3>
                    <ul>
                        {problemas && problemas.problemas ? (
                            problemas.problemas.some(problema => problema.tema.id === 1) ? (
                                problemas.problemas.map((problema, index) => (
                                    problema.tema.id === 1 ? (
                                        <div key={index} className="problema-container">
                                            <li>
                                                <details>
                                                    <summary>
                                                        <div className="problemSummary" style={{ marginBottom: 10 }}>
                                                            {problema.desc}


                                                            <div className="solucao-problema">
                                                                <div className="botao-container">
                                                                    <button
                                                                        onClick={() => navigate(`/editarProblemas/${problema.id}`)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: 5
                                                                        }}
                                                                    >
                                                                        <FaPencil style={{ fontSize: 20 }} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProblema(problema.id)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </summary>
                                                    {problema.solucao.map((solucao, solucaoIndex) => (
                                                        <>
                                                            <div className="solucao-container">
                                                                {visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <input
                                                                            value={solucaoDesc}
                                                                            onChange={handleUpdate}
                                                                        />

                                                                        <button
                                                                            onClick={() => handleUpdateSolu(solucaoDesc, solucao.id)}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdCheckmark style={{ fontSize: 25 }} />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc('')]}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdClose style={{ fontSize: 30 }} />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                {!visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <p key={solucaoIndex}>{solucao.desc}</p>
                                                                        <div className="botao-container">
                                                                            <button
                                                                                onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc(solucao.desc)]}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginRight: '5px',
                                                                                }}
                                                                            >
                                                                                <FaPencil style={{ fontSize: 20 }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteSolucao(solucao.id)}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginLeft: '5px',
                                                                                }}
                                                                            >
                                                                                <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}

                                                    <div>
                                                        {visible[problema.id] && (
                                                            <>
                                                                <input
                                                                    value={newSolucao}
                                                                    onChange={handleChange}
                                                                />

                                                                <button
                                                                    onClick={() => handleAdd(newSolucao, problema.id)}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                </button>

                                                                <button
                                                                    onClick={() => [toggleInput(problema.id), setNewSolucao('')]}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdClose style={{ fontSize: 20 }} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="botao-adicionar"
                                                        onClick={() => toggleInput(problema.id)}>
                                                        <div style={{ marginTop: 10 }}>
                                                            <FaPlus style={{ fontSize: 20, marginRight: 10 }} />
                                                        </div>

                                                        <div style={{ marginTop: 10 }}>
                                                            <span> Adicionar solução</span>
                                                        </div>
                                                    </button>
                                                </details>
                                            </li>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                <p>Ainda não há nada para mostrar aqui.</p>
                            )
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>

                <div className="problema">
                    <h3>Modem</h3>
                    <ul>
                        {problemas && problemas.problemas ? (
                            problemas.problemas.some(problema => problema.tema.id === 2) ? (
                                problemas.problemas.map((problema, index) => (
                                    problema.tema.id === 2 ? (
                                        <div key={index} className="problema-container">
                                            <li>
                                                <details>
                                                    <summary>
                                                        <div className="problemSummary" style={{ marginBottom: 10 }}>
                                                            {problema.desc}


                                                            <div className="solucao-problema">
                                                                <div className="botao-container">
                                                                    <button
                                                                        onClick={() => navigate(`/editarProblemas/${problema.id}`)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: 5
                                                                        }}
                                                                    >
                                                                        <FaPencil style={{ fontSize: 20 }} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProblema(problema.id)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </summary>
                                                    {problema.solucao.map((solucao, solucaoIndex) => (
                                                        <>
                                                            <div className="solucao-container">
                                                                {visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <input
                                                                            value={solucaoDesc}
                                                                            onChange={handleUpdate}
                                                                        />

                                                                        <button
                                                                            onClick={() => handleUpdateSolu(solucaoDesc, solucao.id)}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc('')]}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdClose style={{ fontSize: 20 }} />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                {!visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <p key={solucaoIndex}>{solucao.desc}</p>
                                                                        <div className="botao-container">
                                                                            <button
                                                                                onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc(solucao.desc)]}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginRight: '5px',
                                                                                }}
                                                                            >
                                                                                <FaPencil style={{ fontSize: 20 }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteSolucao(solucao.id)}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginLeft: '5px',
                                                                                }}
                                                                            >
                                                                                <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}

                                                    <div>
                                                        {visible[problema.id] && (
                                                            <>
                                                                <input
                                                                    value={newSolucao}
                                                                    onChange={handleChange}
                                                                />

                                                                <button
                                                                    onClick={() => handleAdd(newSolucao, problema.id)}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                </button>

                                                                <button
                                                                    onClick={() => [toggleInput(problema.id), setNewSolucao('')]}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdClose style={{ fontSize: 20 }} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="botao-adicionar"
                                                        onClick={() => toggleInput(problema.id)}>
                                                        <div style={{ marginTop: 10 }}>
                                                            <FaPlus style={{ fontSize: 20, marginRight: 10 }} />
                                                        </div>

                                                        <div style={{ marginTop: 10 }}>
                                                            <span> Adicionar solução</span>
                                                        </div>
                                                    </button>
                                                </details>
                                            </li>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                <p>Ainda não há nada para mostrar aqui.</p>
                            )
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>

                <div className="problema">
                    <h3>Velocidade de internet</h3>
                    <ul>
                        {problemas && problemas.problemas ? (
                            problemas.problemas.some(problema => problema.tema.id === 4) ? (
                                problemas.problemas.map((problema, index) => (
                                    problema.tema.id === 4 ? (
                                        <div key={index} className="problema-container">
                                            <li>
                                                <details>
                                                    <summary>
                                                        <div className="problemSummary" style={{ marginBottom: 10 }}>
                                                            {problema.desc}


                                                            <div className="solucao-problema">
                                                                <div className="botao-container">
                                                                    <button
                                                                        onClick={() => navigate(`/editarProblemas/${problema.id}`)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: 5
                                                                        }}
                                                                    >
                                                                        <FaPencil style={{ fontSize: 20 }} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProblema(problema.id)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </summary>
                                                    {problema.solucao.map((solucao, solucaoIndex) => (
                                                        <>
                                                            <div className="solucao-container">
                                                                {visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <input
                                                                            value={solucaoDesc}
                                                                            onChange={handleUpdate}
                                                                        />

                                                                        <button
                                                                            onClick={() => handleUpdateSolu(solucaoDesc, solucao.id)}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc('')]}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdClose style={{ fontSize: 20 }} />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                {!visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <p key={solucaoIndex}>{solucao.desc}</p>
                                                                        <div className="botao-container">
                                                                            <button
                                                                                onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc(solucao.desc)]}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginRight: '5px',
                                                                                }}
                                                                            >
                                                                                <FaPencil style={{ fontSize: 20 }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteSolucao(solucao.id)}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginLeft: '5px',
                                                                                }}
                                                                            >
                                                                                <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}

                                                    <div>
                                                        {visible[problema.id] && (
                                                            <>
                                                                <input
                                                                    value={newSolucao}
                                                                    onChange={handleChange}
                                                                />

                                                                <button
                                                                    onClick={() => handleAdd(newSolucao, problema.id)}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                </button>

                                                                <button
                                                                    onClick={() => [toggleInput(problema.id), setNewSolucao('')]}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdClose style={{ fontSize: 20 }} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="botao-adicionar"
                                                        onClick={() => toggleInput(problema.id)}>
                                                        <div style={{ marginTop: 10 }}>
                                                            <FaPlus style={{ fontSize: 20, marginRight: 10 }} />
                                                        </div>

                                                        <div style={{ marginTop: 10 }}>
                                                            <span> Adicionar solução</span>
                                                        </div>
                                                    </button>
                                                </details>
                                            </li>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                <p>Ainda não há nada para mostrar aqui.</p>
                            )
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>

                {/*<div className="problema">
                    <h3>Outros</h3>
                    <ul>
                        {problemas && problemas.problemas ? (
                            problemas.problemas.some(problema => problema.tema.id === 3) ? (
                                problemas.problemas.map((problema, index) => (
                                    problema.tema.id === 3 ? (
                                        <div key={index} className="problema-container">
                                            <li>
                                                <details>
                                                    <summary>
                                                        <div className="problemSummary" style={{ marginBottom: 10 }}>
                                                            {problema.desc}


                                                            <div className="solucao-problema">
                                                                <div className="botao-container">
                                                                    <button
                                                                        onClick={() => navigate(`/editarProblemas/${problema.id}`)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: 5
                                                                        }}
                                                                    >
                                                                        <FaPencil style={{ fontSize: 20 }} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteProblema(problema.id)}
                                                                        type="button"
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </summary>
                                                    {problema.solucao.map((solucao, solucaoIndex) => (
                                                        <>
                                                            <div className="solucao-container">
                                                                {visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <input
                                                                            value={solucaoDesc}
                                                                            onChange={handleUpdate}
                                                                        />

                                                                        <button
                                                                            onClick={() => handleUpdateSolu(solucaoDesc, solucao.id)}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                        </button>

                                                                        <button
                                                                            onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc('')]}
                                                                            type="button"
                                                                            style={{
                                                                                border: 'none',
                                                                                background: 'none',
                                                                                cursor: 'pointer',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                        >
                                                                            <IoMdClose style={{ fontSize: 20 }} />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                {!visibleSolu[solucao.id] && (
                                                                    <>
                                                                        <p key={solucaoIndex}>{solucao.desc}</p>
                                                                        <div className="botao-container">
                                                                            <button
                                                                                onClick={() => [toggleSolucao(solucao.id), setSolucaoDesc(solucao.desc)]}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginRight: '5px',
                                                                                }}
                                                                            >
                                                                                <FaPencil style={{ fontSize: 20 }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteSolucao(solucao.id)}
                                                                                type="button"
                                                                                style={{
                                                                                    border: 'none',
                                                                                    background: 'none',
                                                                                    cursor: 'pointer',
                                                                                    marginLeft: '5px',
                                                                                }}
                                                                            >
                                                                                <FaRegTrashCan style={{ fontSize: 20 }} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}

                                                    <div>
                                                        {visible[problema.id] && (
                                                            <>
                                                                <input
                                                                    value={newSolucao}
                                                                    onChange={handleChange}
                                                                />

                                                                <button
                                                                    onClick={() => handleAdd(newSolucao, problema.id)}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdCheckmark style={{ fontSize: 20 }} />
                                                                </button>

                                                                <button
                                                                    onClick={() => [toggleInput(problema.id), setNewSolucao('')]}
                                                                    type="button"
                                                                    style={{
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        cursor: 'pointer',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    <IoMdClose style={{ fontSize: 20 }} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="botao-adicionar"
                                                        onClick={() => toggleInput(problema.id)}>
                                                        <div style={{ marginTop: 10 }}>
                                                            <FaPlus style={{ fontSize: 20, marginRight: 10 }} />
                                                        </div>

                                                        <div style={{ marginTop: 10 }}>
                                                            <span> Adicionar solução</span>
                                                        </div>
                                                    </button>
                                                </details>
                                            </li>
                                        </div>
                                    ) : null
                                ))
                            ) : (
                                <p>Ainda não há nada para mostrar aqui.</p>
                            )
                        ) : (
                            <></>
                        )}
                    </ul>
                        </div> */}
            </section>
        </div >
    )
}