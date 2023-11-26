import React, { useState } from "react";
import Swal from 'sweetalert2';
import './cadSolucao.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import cadastroSolucao from "./cadSolucao.interface";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";

export default function CadastroSolucao(props: cadastroSolucao) {
    const [tema, setTema] = useState(props.tema || '');
    const [mensagem, setMensagem] = useState(props.mensagem || '');
    const [solucoes, setSolucoes] = useState<string[]>([]);
    const [solucao, setSolucao] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [temaError, setTemaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
        console.log(tema)
    };

    const handleMensagemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMensagem = e.target.value;
        setMensagem(newMensagem);
    };

    const handleAddSolution = () => {
        if (solucao) {
            setSolucoes([...solucoes, solucao]);
            setSolucao('');
        }
    }

    const handleRemoveSolution = (index: number) => {
        const newSolucoes = [...solucoes];
        newSolucoes.splice(index, 1);
        setSolucoes(newSolucoes);
    }

    const handleSolucaoChange = (index: number, value: string) => {
        const newSolucoes = [...solucoes];
        newSolucoes[index] = value;
        setSolucoes(newSolucoes);
    }

    const validateMensagem = (mensagem: string): boolean => {
        const mensagemRegex = /^.*$/i;
        return mensagemRegex.test(mensagem);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formIsValid = true;

        if (tema === "") {
            setTemaError('Por favor, selecione o tema.');
            formIsValid = false;
        } else {
            setTemaError('');
        }

        if (mensagem === "" || !validateMensagem(mensagem)) {
            setMensagemError('Por favor, descreva o problema.');
            formIsValid = false;
        } else {
            setMensagemError('');
        }

        if (formIsValid) {
            showSuccess();
            const token = localStorage.getItem('token');
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.post('http://localhost:5000/criarProblemas', {
                'tema_id': tema,
                'desc': mensagem,
                'solucao': solucoes
            });
            console.log(formIsValid, tema, mensagem, solucoes);
        } else {
            showWarning('Por favor, corrija os campos indicados.');
        }
    };

    const showWarning = (message: string) => {
        Swal.fire({
            title: 'Aviso',
            text: message,
            icon: 'warning',
        });
    };

    const showSuccess = () => {
        Swal.fire({
            title: "Enviado com sucesso",
            text: "Suas informações foram enviadas com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="cliUserForm">
            <label id="tema">
                Tema:
                <select className="browser-default" value={tema} onChange={handleTemaChange}
                    style={{ height: 50, marginTop: 10 }}>
                    <option value="">Selecione um tema</option>
                    <option value="1">Sem acesso a Internet</option>
                    <option value="2">Modem</option>
                    <option value="4">Velocidade da internet</option>
                </select>
                <div className="error">{temaError}</div>
            </label>

            <label>
                Problema:
                <textarea value={mensagem} onChange={handleMensagemChange}
                    style={{ height: 200, marginTop: 10, paddingTop: 10 }} />
                <div className="error">{mensagemError}</div>
            </label>

            <label>
                Soluções:

                {solucoes.map((solucao, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={solucao}
                            onChange={(e) => handleSolucaoChange(index, e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveSolution(index)}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '5px', 
                            }}
                        >
                            <FaRegTrashCan style={{ fontSize: 20 }} />
                        </button>
                    </div>

                ))}

                <input
                    type="text"
                    value={solucao}
                    onChange={(e) => setSolucao(e.target.value)}
                />

                <button type="button" onClick={handleAddSolution} className="botao-adicionar">
                    <div style={{ marginTop: 10 }}>
                        <FaPlus style={{ fontSize: 20, marginRight: 10 }} />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <span> Adicionar solução</span>
                    </div>
                </button>
            </label>

            <input type="submit" value="Enviar" id="button" />
        </form>
    );
}
