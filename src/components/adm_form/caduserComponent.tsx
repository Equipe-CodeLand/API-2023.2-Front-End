import React, { useState } from 'react';
import CadaUser from './caduser.interface';
import './caduser.css';
import Swal, { SweetAlertResult } from 'sweetalert2';

export default function CadUser(props: CadaUser) {
    const [nome, setNome] = useState(props.nome || '');
    const [cpf, setCpf] = useState(props.cpf || '');
    const [tipo, setTipo] = useState(props.tipo || '');
    const [telefone, setTelefone] = useState(props.telefone || '');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;

        if (!newEmail.includes('@') || newEmail === '') {
            setEmailError('Por favor, preencha um e-mail válido.');
            setEmail('');
            setIsValid(false);
        } else {
            setEmail(newEmail);
            setIsValid(validateEmail(newEmail));
            setEmailError(''); 
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
        const newCpf = e.target.value;

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
    };  

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTelefone = e.target.value;

        if (!newTelefone) {
            setTelefoneError('Por favor, preencha o seu telefone.');
            setTelefone('');
            setIsValid(false);
        } else {
            setTelefone(newTelefone);
            setIsValid(validateTelefone(newTelefone));
            setTelefoneError(''); 
        }
    };  

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validateNome = (nome: string): boolean => {
        const nomeRegex = /^\w+$/i;
        return nomeRegex.test(nome);
    }

    const validateCpf = (cpf: string): boolean => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfRegex.test(cpf);
    }

    const validateTelefone = (telefone: string): boolean => {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return telefoneRegex.test(telefone);
    }

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
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                alert('Usuário cadastrado com sucesso!');
            } else if (result.isDismissed) {
                alert('Cadastro cancelado pelo usuário');
            }
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
                    <option value="Administrador">Administrador</option>
                </select>
                <span style={{ color: 'red' }}>{tipoError}</span>
            </label>
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
