"use client";

import React, { useState } from "react";
import { LoginController } from "./LoginController";

type LoginFormProps = {
    controller: LoginController;
};

export const LoginForm: React.FC<LoginFormProps> = ({ controller }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = () => {
        if (controller.login(username, password)) {
            setMessage("Login bem-sucedido!");
        } else {
            setMessage("Credenciais inválidas.");
        }
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            <button onClick={handleLogin}>Entrar</button>
            <p>{message}</p>
        </div>
    );
};