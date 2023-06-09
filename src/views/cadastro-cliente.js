import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import '../custom.css'

import axios from "axios";
import { BASE_URL } from "../config/axios";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

function CadastroCliente() {
    const { idParam } = useParams();
    const navigate = useNavigate();
    const baseURL = `${BASE_URL}/clientes`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [enderecoCep, setEnderecoCep] = useState('');
    const [tituloLivro, setTituloLivro] = useState(0);

    const [dados, setDados] = React.useState([]);


    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setCpf('');
            setEmail('');
            setEnderecoCep('');
            setTituloLivro(0);
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setCpf(dados.cpf);
            setEmail(dados.email);
            setEnderecoCep(dados.enderecoCep);
            setTituloLivro(dados.tituloLivro);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            cpf,
            email,
            enderecoCep,
            tituloLivro
        };
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function(response) {
                    mensagemSucesso(`Cliente ${nome} cadastrado com sucesso!`);
                    navigate(`/listagem-clientes`);
                })
                .catch(function(error) {
                mensagemErro(error.response.data);
            });
        } else {
            await axios
                .put(`${baseURL}/${idParam}`, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function(response) {
                    mensagemSucesso(`Cliente ${nome} alterado com sucesso!`);
                    navigate(`/listagem-clientes`);
                })
                .catch(function(error) {
                    mensagemErro(error.response.data);
                });
        }
    }  
    
    async function buscar() {
        if (idParam) {
            await axios.get(`${baseURL}/${idParam}`)
            .then((response) => {
                setDados(response.data);
                setId(response.data.id);
                setNome(response.data.nome);
                setCpf(response.data.cpf);
                setEmail(response.data.email);
                setEnderecoCep(response.data.enderecoCep);
                setTituloLivro(response.data.tituloLivro);
                })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    const [dadosLivros, setDadosLivros] = React.useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/livros`)
        .then((response) => {
            setDadosLivros(response.data);
        });
    }, []);

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;
    if (!dadosLivros) return null;


    return (
        <div className='container'>
            <Card title='Cadastro de Cliente'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Nome: *' htmlFor='inputNome'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                </FormGroup>
                            <FormGroup label='CPF: *' htmlFor='inputCpf'>
                                <input
                                    type='text'
                                    maxLength='11'
                                    id='inputCpf'
                                    value={cpf}
                                    className='form-control'
                                    name='cpf'
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                                </FormGroup>
                            <FormGroup label='Email: *' htmlFor='inputEmail'>
                                <input
                                    type='text'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                </FormGroup>
                            <FormGroup label='Endereço*(Cep) :' htmlFor='inputCep'>
                                <input
                                    type='endereco'
                                    maxLength='8'
                                    id='inputCep'
                                    value={enderecoCep}
                                    className='form-control'
                                    name='endereco'
                                    onChange={(e) => setEnderecoCep(e.target.value)}
                                />
                                </FormGroup>
                            <FormGroup label='Livro: *' htmlFor='selectLivro'>
                                <select
                                    className='form-select'
                                    id='selectLivro'
                                    name='tituloLivro'
                                    value={tituloLivro}
                                    onChange={(e) => setTituloLivro(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {'Selecione um livro'}
                                    </option>
                                    {dadosLivros.map((dado) => (
                                        <option key={dado.id} value={dado.titulo}>
                                            {dado.titulo}
                                        </option>
                                ))}
                            </select>
                        </FormGroup>
                        <Stack spacing={1} padding={1} direction='row'>
                            <button
                                onClick={salvar}
                                type='button'
                                className='btn btn-success'
                            >
                            Salvar
                            </button>
                            <button
                                onClick={inicializar}
                                type='button'
                                className='btn btn-danger'
                            >
                                Cancelar
                            </button>
                        </Stack>
                    </div>
                </div>
            </div>
        </Card>
    </div>
);
}

export default CadastroCliente;


