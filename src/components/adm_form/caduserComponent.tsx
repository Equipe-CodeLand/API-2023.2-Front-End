import React, { useState } from 'react';
import CadaUser from './caduser.interface';
import './caduser.css';
import Swal, { SweetAlertResult } from 'sweetalert2';
import axios from 'axios';

export default function CadUser(props: CadaUser) {
    const [nome, setNome] = useState(props.nome || '');
    const [sobrenome, setSobrenome] = useState(props.sobrenome || '');
    const [cpf, setCpf] = useState(props.cpf || '');
    const [tipo, setTipo] = useState(props.tipo || '');
    const [telefone, setTelefone] = useState(props.telefone || '');
    const [turno, setTurno] = useState(props.turno || '');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(props.senha || '')
    const [isValid, setIsValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [sobrenomeError, setSobrenomeError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [senhaError, setSenhaError] = useState('')

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

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSenha = e.target.value;
        setSenha(newSenha);
    
        if (!validateEmail(newSenha) && newSenha.length > 8) {
            setSenhaError('Por favor, preencha uma senha válida.');
            setIsValid(false);
        } else {
            setSenhaError(''); 
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

    const validateSenha = (senha: string): boolean => {
        const senhaRegex = /^[a-zA-Z0-9]{1,8}$/i;
        return senhaRegex.test(senha);
    };  

    const validateNome = (nome: string): boolean => {
        const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/i;
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        console.log(`nome: ${nome}`)
        console.log(`sobrenome: ${sobrenome}`)
        console.log(`cpf: ${cpf}`)
        console.log(`telefone: ${telefone}`)
        console.log(`email: ${email}`)
        console.log(`tipo: ${tipo}`)
        console.log(`turno: ${turno}`)

        event.preventDefault();
    
        let formIsValid = true;
    
        if (nome === "" || !validateNome(nome)) {
            setNomeError('Por favor, preencha o seu nome.');
            formIsValid = false;
        } else {
            setNomeError('');
        }

        if (sobrenome === "" || !validateSobrenome(sobrenome)) {
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

        if (senha === "" || !validateSenha(senha)) {
            setSenhaError('Por favor, preencha uma senha válida.');
            formIsValid = false;
        } else {
            setSenhaError('');
        }
    
        if (formIsValid) {
            try {
                let rotaCadastro = '';

                const dadosUsuario = {
                    'nome': nome,
                    'sobrenome': sobrenome,
                    'email': email,
                    'tipo': tipo,
                    'turno': turno,
                    'telefone': telefone,
                    'cpf': cpf,
                    'senha': senha
                };

                const response = await axios.post(rotaCadastro, dadosUsuario);

                if (tipo === 'Cliente') {
                    rotaCadastro = 'http://localhost:5000/cadastro/cliente';
                } else if (tipo === 'Atendente') {
                    rotaCadastro = 'http://localhost:5000/cadastro/atendente';
                } else if (tipo === 'Administrador') {
                    rotaCadastro = 'http://localhost:5000/cadastro/administrador';
                }

                if (response.data.message === 'Usuário já existe') {
                    // O usuário já existe, exibir um alerta para o usuário
                    Swal.fire({
                        title: 'Erro',
                        text: 'Usuário já existe',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Resetar os valores do formulário
                        setNome('');
                        setSobrenome('');
                        setEmail('');
                        setTipo(''); // Adicione um método setter para o tipo se necessário
                        setTurno(''); // Adicione um método setter para o turno se necessário
                        setTelefone('');
                        setCpf('');
                        setSenha('');
                    });
                } else {
                    // O usuário não existe, realizar o cadastro
                    // ...
    
                    // Mostrar sucesso
                    showSuccess();
                }
            } catch (error) {
                // Algum outro erro ocorreu
                console.error(error);
                
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao criar usuário',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Resetar os valores do formulário
                    setNome('');
                    setSobrenome('');
                    setEmail('');
                    setTipo(''); // Adicione um método setter para o tipo se necessário
                    setTurno(''); // Adicione um método setter para o turno se necessário
                    setTelefone('');
                    setCpf('');
                    setSenha('');
                });
            }            
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
        });
    };

    return (
        <form onSubmit={handleSubmit} className="cadUserForm">
            <label>
                Nome:
                <input type="text" value={nome} onChange={handleNomeChange} placeholder='Insira o nome do usuário'/>
                <div className="error">{nomeError}</div>
            </label>
            <label>
                Sobrenome:
                <input type="text" value={sobrenome} onChange={handleSobrenomeChange} />
                <div className="error">{sobrenomeError}</div>
            </label>
            <label>
                CPF:
                <input type="text" value={cpf} onChange={handleCpfChange} />
                <div className="error">{cpfError}</div>
            </label>
            <label>
                E-mail:
                <input type="text" value={email} onChange={handleEmailChange} />
                <div className="error">{emailError}</div>
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={handleSenhaChange} maxLength={8} placeholder="Digite uma senha de 8 dígitos alfanumérica" />
                <div className="error">{senhaError}</div>
            </label>
            <label>
                Selecione o tipo de usuário a ser cadastrado:
                <select className="browser-default" value={tipo} onChange={handleTipoChange}>
                    <option value="">Tipo</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Atendente">Atendente</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <div className="error">{tipoError}</div>
            </label>
            {tipo === 'Atendente' && (
                <label>
                    Selecione o turno do atendente:
                    <select className="browser-default" value={turno} onChange={handleTurnoChange}>
                        <option value="">Turno</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                    </select>
                </label>
            )}
            <label>
                Telefone:
                <input type="text" value={telefone} onChange={handleTelefoneChange} />
                <div className="error">{telefoneError}</div>
            </label>
            <input type="submit" value="Enviar" id='button'/>
        </form>
    );
};