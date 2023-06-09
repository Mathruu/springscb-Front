import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import '../custom.css'

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastrarFuncionaro() {

    const { idParam } = useParams();
    const navigate = useNavigate();
    const baseURL = `${BASE_URL}/funcionarios`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState(0);
    const [salario, setSalario] = useState('');
    const [vendas, setVendas] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setCpf('');
            setEmail('');
            setEndereco(0);
            setSalario('');
            setVendas('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setCpf(dados.cpf);
            setEmail(dados.email);
            setEndereco(dados.endereco);
            setSalario(dados.salario);
            setVendas(dados.vendas);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            cpf,
            email,
            endereco,
            salario,
            vendas
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                mensagemSucesso(`Funcionário ${nome} cadastrado com sucesso!`);
                navigate(`/listagem-funcionarios`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        } else {
            await axios
            .put(`${baseURL}/${idParam}`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                mensagemSucesso(`Funcionário ${nome} alterado com sucesso!`);
                navigate(`/listagem-funcionarios`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }
    }

    async function buscar() {
        await axios
        .get(`${baseURL}/${idParam}`)
        .then((response) => {
            setDados(response.data);
        });
        setId(dados.id);
        setNome(dados.nome);
        setCpf(dados.cpf);
        setEmail(dados.email);
        setEndereco(dados.endereco);
        setSalario(dados.salario);
        setVendas(dados.vendas);
    }

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;


    return (
        <div className='container'>
            <Card title='Cadastro de Professor'>
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
                                    type='email'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Endereço' htmlFor='inputEndereco'>
                                <input
                                    type='text'
                                    id='inputEndereco'
                                    value={endereco}
                                    className='form-control'
                                    name='endereco'
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Salário' htmlFor='inputSalario'>
                                <input
                                    type='text'
                                    id='inputSalario'
                                    value={salario}
                                    className='form-control'
                                    name='salario'
                                    onChange={(e) => setSalario(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Vendas' htmlFor='inputVendas'>
                                <input
                                    type='text'
                                    id='inputVendas'
                                    value={vendas}
                                    className='form-control'
                                    name='vendas'
                                    onChange={(e) => setVendas(e.target.value)}
                                />
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

export default CadastrarFuncionaro;

