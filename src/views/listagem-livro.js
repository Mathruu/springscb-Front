import React from "react";

import Card from "../components/card";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import '../custom.css'

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/livros`;

function ListagemLivro() {
    const navigate = useNavigate();

    const cadastrar = () => {
        navigate("/cadastro-livro");
    };

    const editar = (id) => {
        navigate(`/cadastro-livro/${id}`);
    };

    const [dados, setDados] = React.useState(null);

    async function excluir(id) {
        let data = JSON.stringify(id);
        let url = `${baseURL}/${id}`;
        console.log(url);
        await axios
            .delete(url, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                mensagemSucesso("Livro excluído com sucesso!");
                setDados(
                    dados.filter((dado) => {
                        return dado.id !== id;
                    })
                );
            })
            .catch(function (error) {
                mensagemErro("Erro ao excluir livro!");
            });
    }

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setDados(response.data);
        });
    }, []);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Listagem de livros'>
                <div className='row'>
                <div className='col-lg-12'>
                    <div className='bs-component'>
                        <button
                            type='button'
                            className='btn btn-warning'
                            onClick={() => cadastrar()}
                        >
                            Novo Livro
                        </button>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Título</th>
                                    <th scope='col'>Autor</th>
                                    <th scope='col'>Editora</th>
                                    <th scope='col'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((dado) => (
                                    <tr key={dado.id}>
                                        <td>{dado.titulo}</td>
                                        <td>{dado.autor}</td>
                                        <td>{dado.editora}</td>
                                        <td>
                                            <Stack spacing={1} padding={0} direction='row'>
                                                <IconButton
                                                    aria-label='edit'
                                                    onClick={() => editar(dado.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label='delete'
                                                    onClick={() => excluir(dado.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>{' '}
                    </div>
                </div>
            </div>
        </Card>
    </div>
);
}

export default ListagemLivro;
