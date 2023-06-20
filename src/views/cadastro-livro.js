import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';

import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CasdastroLivro() {
    const { idParam } = useParams();
    const navigate = useNavigate();
    const baseURL = `${BASE_URL}/livros`;

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editora, setEditora] = useState(''); 
    const [descricao, setDescricao] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setTitulo('');
            setAutor('');
            setEditora('');
            setDescricao('');
        } else {
            setId(dados.id) 
            setTitulo(dados.titulo);
            setAutor(dados.autor);
            setEditora(dados.editora);
            setDescricao(dados.descricao);
        }
    }
    
    async function salvar (){
        let data = {
            id,
            titulo,
            autor,
            editora,
            descricao,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL,  data, {
                headers: {'Content-Type': 'application/json'},
            })
            .then(function (response) {
                mensagemSucesso(`Livro ${titulo} cadastrado com sucesso!`);
                navigate(`/listagem-livro`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        } else {
            await axios
            .put(`${baseURL}/${idParam}`, data, {
                headers: {'Content-Type': 'application/json'},
        })
        .then(function (response) {
            mensagemSucesso(`Livro ${titulo} alterado com sucesso!`);
            navigate(`/listagem-livro`);
        })
        .catch(function (error) {
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
                    setTitulo(response.data.titulo);
                    setAutor(response.data.autor);
                    setEditora(response.data.editora);
                    setDescricao(response.data.descricao);
                    })
                .catch((error) => {
                    console.error(error);
                });
            }
        }

    useEffect(() => {
        buscar();
    }, [id]);

    return (
        <div className='container'>
            <Card title='Cadastro de Livro'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Título: *' htmlFor='inputTitulo'>
                                <input
                                    type='text'
                                    id='inputTitulo'
                                    value={titulo}
                                    className='form-control'
                                    name='titulo'
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Autor: *' htmlFor='inputAutor'>
                                <input
                                    type='text'
                                    id='inputAutor'
                                    value={autor}
                                    className='form-control'
                                    name='Autor'
                                    onChange={(e) => setAutor(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Editora: *' htmlFor='inputEditora'>
                                <input
                                    type='text'
                                    id='inputEditora'
                                    value={editora}
                                    className='form-control'
                                    name='editora'
                                    onChange={(e) => setEditora(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                            <textarea
                                id="inputDescricao"
                                value={descricao}
                                className="form-control"
                                name="descricao"
                                rows={3}
                                onChange={(e) => setDescricao(e.target.value)}
                            ></textarea>
                            </FormGroup>
                                    <br></br>
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

export default CasdastroLivro;