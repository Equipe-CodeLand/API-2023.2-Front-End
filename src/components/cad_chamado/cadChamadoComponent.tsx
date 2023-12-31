import { useState } from "react";
import Swal, { SweetAlertResult } from 'sweetalert2';
import './cadChamado.css';
import axios from "axios";
import cadChamados from "./cadChamado.interface";
import { jwtDecode } from "jwt-decode";

export default function ChamadosForm(props: cadChamados) {
    const [tema, setTema] = useState(props.tema || '');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState(props.mensagem || '');
    const [isValid, setIsValid] = useState(true);
    const [temaError, setTemaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
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
            setTemaError('Por favor, selecione o tipo de usuário.');
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
            axios.post('http://localhost:5000/criarChamados', { 'idTema': tema, 'desc': mensagem, 'userId': jwtDecode(localStorage.getItem('token') || '')['userId'], })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
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
                Mensagem:
                <textarea value={mensagem} onChange={handleMensagemChange}
                    style={{ height: 200, marginTop: 10, paddingTop: 10}} />
                <div className="error">{mensagemError}</div>
            </label>

            <input type="submit" value="Enviar" id="button"/>
        </form>
    )
}
