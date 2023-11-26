import { EdicaoProblema } from "./solucao.interface";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import './cadSolucao.css';
import axios from "axios";

export default function EditarProblema() {
    const { id } = useParams()
    const [problema, setProblema] = useState<EdicaoProblema>()
    const [tema, setTema] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [temaError, setTemaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/buscarProblema/${id}`)
            .then(res => {
                setProblema(res.data.problema)
                setTema(res.data.problema.tema.id.toString())
                setMensagem(res.data.problema.desc)                
            })
    }, [])    

    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
        console.log(tema)
    };

    const handleMensagemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMensagem = e.target.value;
        setMensagem(newMensagem);
    };

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
            axios.put(`http://localhost:5000/atualizarProblemas/${id}`, {
                'tema_id': tema,
                'desc': mensagem,
            });
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
                    <option value="3">Outros</option>
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

            <input type="submit" value="Enviar" id="button" />
        </form>
    );
}
