import React, { useState } from 'react';
import axios from "axios";

export function Login({ setToken }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('/login', { usuario, senha });

            if (response.status === 200) {
                setToken(response.data.token);
                console.log('Login bem-sucedido');
            } else {
                alert('Login falhou!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Credenciais inválidas');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-3">
                <h1 className="font-bold text-xl mb-4">Faça seu login</h1>
                <input
                    placeholder="Usuário"
                    type='text'
                    className="input input-primary w-full"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    isrequired />
                <input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    className="input input-primary w-full"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    isrequired />
                <button className="btn btn-primary w-full" type="submit">Login</button>
            </form>
            </div>
    );
}
