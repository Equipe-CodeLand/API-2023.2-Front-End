import { useState } from "react";
import CadaCli from "./cad_cli.interface";
import Swal, { SweetAlertResult } from 'sweetalert2';
import './cad_cli.css';

export default function CadCli(props:CadaCli){
    const [nome, setNome] = useState(props.nome || '');
    const [sobrenome, setSobrenome] = useState(props.sobrenome || '');
    const [cpf, setCpf] = useState(props.cpf || '');
    const [tema, setTema] = useState(props.tema || '');
    const [telefone, setTelefone] = useState(props.telefone || '');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState(props.mensagem || '');
    const [isValid, setIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [sobrenomeError, setSobrenomeError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [temaError, setTemaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    
        if (!validateEmail(newEmail)) {
            setEmailError('Por favor, preencha um e-mail válido.');
            setIsValid(false);
        } else {
            setEmailError(''); 
            setIsValid(true);
        }
    };     

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNome = e.target.value;

        if (!newNome) {
            setNomeError('Por favor, preencha o seu nome.');
            setNome('');
            setIsValid(false);
        } else {
            setNome(newNome);
            setIsValid(validateNome(newNome));
            setNomeError(''); 
        }
    };  

    const handleSobrenomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSobrenome = e.target.value;

        if (!newSobrenome) {
            setSobrenomeError('Por favor, preencha o seu nome.');
            setSobrenome('');
            setIsValid(false);
        } else {
            setSobrenome(newSobrenome);
            setIsValid(validateSobrenome(newSobrenome));
            setSobrenomeError(''); 
        }
    };  

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCpf = formatCPF(e.target.value);

        if (!newCpf) {
            setCpfError('Por favor, preencha o seu CPF.');
            setCpf('');
            setIsValid(false);
        } else {
            setCpf(newCpf);
            setIsValid(validateCpf(newCpf));
            setCpfError(''); 
        }
    };  

    const handleTemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTema = e.target.value;
        setTema(newTema);
    };

    const handleMensagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMensagem = e.target.value;
        setMensagem(newMensagem);
    };    

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTelefone = formatTelefone(e.target.value);
        setTelefone(newTelefone);
    }; 

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validateNome = (nome: string): boolean => {
        const nomeRegex = /^[a-zA-Z\s]*$/i;
        return nomeRegex.test(nome);
    }; 
    
    const validateSobrenome = (sobrenome: string): boolean => {
        const sobrenomeRegex = /^[a-zA-Z\s]*$/i;
        return sobrenomeRegex.test(sobrenome);
    };    

    const formatCPF = (cpf: string): string => {
        const cleaned = cpf.replace(/\D/g, ''); // Remove todos os não-dígitos do número do cpf
        let formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
        return formatted;
    };
    

    const validateCpf = (cpf: string): boolean => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfRegex.test(cpf);
    }

    const formatTelefone = (telefone: string): string => {
        const cleaned = telefone.replace(/\D/g, ''); // Remove todos os não-dígitos do número de telefone
        const formatted = cleaned.replace(/(\d{2})(\d{4,5})(\d{4}).*/, '($1) $2-$3'); // Adiciona hífens
        return formatted;
    };
    
    const validateTelefone = (telefone: string): boolean => {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return telefoneRegex.test(telefone); // Testa o formato do telefone
    }; 
    
    const validateMensagem = (mensagem: string): boolean => {
        const mensagemRegex = /^[a-zA-Z\s]*$/i;
        return mensagemRegex.test(mensagem);
    };  

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        let formIsValid = true;
    
        if (nome === "" || !validateNome(nome)) {
            setNomeError('Por favor, preencha o seu nome.');
            formIsValid = false;
        } else {
            setNomeError('');
        }

        if (sobrenome === "" || !validateNome(sobrenome)) {
            setSobrenomeError('Por favor, preencha o seu sobrenome.');
            formIsValid = false;
        } else {
            setSobrenomeError('');
        }
    
        if (cpf === "" || !validateCpf(cpf)) {
            setCpfError('Por favor, preencha um CPF válido.');
            formIsValid = false;
        } else {
            setCpfError('');
        }
    
        if (tema === "") {
            setTemaError('Por favor, selecione o tipo de usuário.');
            formIsValid = false;
        } else {
            setTemaError('');
        }

        if (telefone === "" || !validateTelefone(telefone)) {
            setTelefoneError('Por favor, preencha um telefone válido.');
            formIsValid = false;
        } else {
            setTelefoneError('');
        }

        if (email === "" || !validateEmail(email)) {
            setEmailError('Por favor, preencha um email válido.');
            formIsValid = false;
        } else {
            setEmailError('');
        }

        if (mensagem === "" || !validateMensagem(mensagem)) {
            setMensagemError('Por favor, pdescreva o problema.');
            formIsValid = false;
        } else {
            setMensagemError('');
        }
    
        if (formIsValid) {
            showSuccess();
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
            <label>
                Nome:
                <input type="text" value={nome} onChange={handleNomeChange} />
                <span style={{ color: 'red' }}>{nomeError}</span>
            </label>
            <br />

            <label>
                Sobrenome:
                <input type="text" value={sobrenome} onChange={handleSobrenomeChange} />
                <span style={{ color: 'red' }}>{sobrenomeError}</span>
            </label>
            <br />

            <label>
                CPF:
                <input type="text" value={cpf} onChange={handleCpfChange} />
                <span style={{ color: 'red' }}>{cpfError}</span>
            </label>
            <br />

            <label>
                Email:
                <input type="text" value={email} onChange={handleEmailChange} />
                <span style={{ color: 'red' }}>{emailError}</span>
            </label>
            <br />

            <label>
                Telefone para contato:
                <input type="text" value={telefone} onChange={handleTelefoneChange} />
                <span style={{ color: 'red' }}>{telefoneError}</span>
            </label>
            <br />

            <label id="tema">
                Tema:
                <select value={tema} onChange={handleTemaChange}>
                    <option value="">Selecione um tema</option>
                    <option value="velocidade">Velocidade da Internet</option>
                    <option value="modem">Modem</option>
                    <option value="conexao">Problemas com conexão</option>
                    <option value="outros">Outros</option>
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