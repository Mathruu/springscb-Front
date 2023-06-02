import React from "react";

import Login from "./views/login";
import CasdastroLivro from "./views/cadastro-livro";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= '/cadastro-livro/idParam?' element={<CasdastroLivro />} />
            </Routes>
        </BrowserRouter>
);
}

export default Rotas;