import React from "react";

import CasdastroLivro from "./views/cadastro-livro";
import CadastroCliente from "./views/cadastro-cliente";
import ListagemClientes from "./views/listagem-clientes";
import CadastrarFuncionaro from "./views/cadastro-funcionarios";
import ListagemLivro from "./views/listagem-livro";
import ListagemFuncionarios from "./views/listagem-funcionarios";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= '/cadastro-cliente/:idParam?' element={<CadastroCliente />} />
                <Route path= '/listagem-clientes' element={<ListagemClientes />} />
                <Route path= '/cadastro-livro/:idParam?' element={<CasdastroLivro />} />
                <Route path= '/listagem-livro' element={<ListagemLivro />} />
                <Route path= '/cadastro-funcionarios/:idParam?' element={<CadastrarFuncionaro />} />
                <Route path= '/listagem-funcionarios' element={<ListagemFuncionarios />} />
            </Routes>
        </BrowserRouter>
);
}

export default Rotas;