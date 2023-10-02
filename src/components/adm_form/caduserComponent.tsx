import React, { useState } from 'react';
import CadaUser from './caduser.interface';
import './caduser.css';
import Swal, { SweetAlertResult } from 'sweetalert2';

export default function CadUser(props: CadaUser) {
    const [nome, setNome] = useState(props.nome || '');
    const [cpf, setCpf] = useState(props.cpf || '');
    const [tipo, setTipo] = useState(props.tipo || '');
    const [telefone, setTelefone] = useState(props.telefone || '');
    const [turno, setTurno] = useState(props.turno || '');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [turnoError, setTurnoError] = useState('');

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

    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTipo = e.target.value;

        if (!newTipo) {
            setTipoError('Por favor, selecione o tipo de usuário.');
            setTipo('');
            setIsValid(false);
        } else {
            setTipo(newTipo);
            setIsValid(true); 
            setTipoError(''); 
        }
        if (newTipo === 'Atendente') {
            setTurno('');
        }
    };  

    const handleTurnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTurno = e.target.value;
        setTurno(newTurno);
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        let formIsValid = true;
    
        if (nome === "" || !validateNome(nome)) {
            setNomeError('Por favor, preencha o seu nome.');
            formIsValid = false;
        } else {
            setNomeError('');
        }
    
        if (cpf === "" || !validateCpf(cpf)) {
            setCpfError('Por favor, preencha um CPF válido.');
            formIsValid = false;
        } else {
            setCpfError('');
        }
    
        if (tipo === "") {
            setTipoError('Por favor, selecione o tipo de usuário.');
            formIsValid = false;
        } else {
            setTipoError('');
        }

        if (turno === "") {
            setTurnoError('Por favor, selecione o turno do atendente.');
            formIsValid = false;
        } else {
            setTurnoError('');
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

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} onChange={handleNomeChange} />
                <span style={{ color: 'red' }}>{nomeError}</span>
            </label>
            <br />
            <label>
                CPF:
                <input type="text" value={cpf} onChange={handleCpfChange} />
                <span style={{ color: 'red' }}>{cpfError}</span>
            </label>
            <br />
            <label>
                E-mail:
                <input type="text" value={email} onChange={handleEmailChange} />
                <span style={{ color: 'red' }}>{emailError}</span>
            </label>
            <br />
            <label>
                Selecione o tipo de usuário a ser cadastrado:
                <select value={tipo} onChange={handleTipoChange}>
                    <option value="">Tipo</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Atendente">Atendente</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <span style={{ color: 'red' }}>{tipoError}</span>
            </label>
            <br />
            {tipo === 'Atendente' && (
                <label>
                    Selecione o turno do atendente:
                    <select value={turno} onChange={handleTurnoChange}>
                        <option value="">Turno</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                    </select>
                    <span style={{ color: 'red' }}>{turnoError}</span>
                </label>
            )}
            <br />
            <label>
                Telefone:
                <input type="text" value={telefone} onChange={handleTelefoneChange} />
                <span style={{ color: 'red' }}>{telefoneError}</span>
            </label>
            <br />
            <input type="submit" value="Enviar" />
        </form>
    );
}
