import React from "react";

import Login from "./views/login";
import CasdastroLivro from "./views/cadastro-livro";
import CadastroCliente from "./views/cadastro-cliente";
import ListagemClientes from "./views/listagem-clientes";
import CadastrarFuncionaro from "./views/cadastro-funcionarios";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= '/login' element={<Login />} />
                <Route path= '/cadastro-livro/idParam?' element={<CasdastroLivro />} />
                <Route path= '/cadastro-cliente/idParam?' element={<CadastroCliente />} />
                <Route path= '/listagem-clientes' element={<ListagemClientes />} />
                <Route path= '/cadastro-funcionarios/idParam?' element={<CadastrarFuncionaro />} />
            </Routes>
        </BrowserRouter>
);
}

export default Rotas;