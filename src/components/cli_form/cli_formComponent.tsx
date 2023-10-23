import { useState } from "react";
import Swal, { SweetAlertResult } from 'sweetalert2';
import './cli_form.css';
import axios from "axios";
import cliForm from "./cli_form.interface";

export default function CliForm(props:cliForm){
    const [tema, setTema] = useState(props.tema || '');
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
        } else {
            showWarning('Por favor, corrija os campos indicados.');
        }

        axios.post('http://localhost:5000/cadastro/cliente',{'tema':tema,'mensagem':mensagem})
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
                    <option value="Velocidade da Internet">Velocidade da Internet</option>
                    <option value="Modem">Modem</option>
                    <option value="Problemas com conexão">Problemas com conexão</option>
                    <option value="Outros">Outros</option>
                </select>
                <span style={{ color: 'red' }}>{temaError}</span>
            </label>
            <br />

            <label>
                Mensagem:
                <textarea id="input-msg" value={mensagem} onChange={handleMensagemChange} />
                <span style={{ color: 'red' }}>{mensagemError}</span>
            </label>
            <br />

            <button type="submit" value="Enviar" >Enviar</button>
        </form>
    )

}