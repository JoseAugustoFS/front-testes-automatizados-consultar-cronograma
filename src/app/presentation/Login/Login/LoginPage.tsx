"use client";

import { LogoutButton } from "../Logout/LogoutButton";
import { LoginController } from "./LoginController";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
    const controller = new LoginController();
    return (
        <div>
            <LoginForm controller={controller} />
            <LogoutButton controller={controller} />
        </div>
    );
}