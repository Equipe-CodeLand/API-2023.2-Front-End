import { useState } from "react";
import Swal, { SweetAlertResult } from 'sweetalert2';
import './cadChamado.css';
import axios from "axios";
import cadChamados from "./cadChamado.interface";

export default function ChamadosForm(props:cadChamados){
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

    const handleMensagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            axios.post('http://localhost:5000/criarChamados',{'idTema':tema,'desc':mensagem})
            console.log(tema);
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

    return(
        <form onSubmit={handleSubmit}>

            <label id="tema">
                Tema:
                <select className="browser-default" value={tema} onChange={handleTemaChange}>
                    <option value="">Selecione um tema</option>
                    <option value="1">Velocidade da Internet</option>
                    <option value="2">Modem</option>
                    <option value="4">Problemas com conexão</option>
                    <option value="3">Outros</option>
                </select>
                <span style={{ color: 'red' }}>{temaError}</span>
            </label>
            <br />

            <label>
                Mensagem:
                <input type="text" value={mensagem} onChange={handleMensagemChange} />
                <span style={{ color: 'red' }}>{mensagemError}</span>
            </label>
            <br />

            <input type="submit" value="Enviar" />
        </form>
    )

}