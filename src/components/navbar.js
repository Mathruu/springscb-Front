import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
    return (
        <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
        <div className='container'>
            <a href='/' className='navbar-brand'>
            SCB
            </a>
        <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarResponsive'
            aria-controls='navbarResponsive'
            aria-expanded='false'
            aria-label='Toggle navigation'
        >
        <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
            <ul className='navbar-nav'>
            <NavbarItem
                render='true'
                href='/listagem-clientes'
                label='Clientes'
            />
        </ul>
        <ul className='navbar-nav'>
            <NavbarItem
                render='true'
                href='/listagem-livro'
                label='Livros'
            />
        </ul>
        <ul className='navbar-nav'>
            <NavbarItem 
                render='true' 
                href='/listegem-funcionarios' 
                label='Funcionários' />
        </ul>
        <ul className='navbar-nav'>
            <NavbarItem 
            render='true' 
            href='/cadastro-clientes' 
            label='Cadastrar Clientes' />
        </ul>
        <ul className='navbar-nav'>
            <NavbarItem 
            render='true' 
            href='/cadastro-livro'
            label='Cadastrar Livros' />
        </ul>
        <ul className='navbar-nav'>
            <NavbarItem 
            render='true' 
            href='/cadastro-funcionarios'
            label='Cadastrar Funcionários' />
        </ul>
        </div>
    </div>
    </div>
);
}

export default Navbar;