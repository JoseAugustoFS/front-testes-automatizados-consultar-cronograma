import dotenv from "dotenv";

dotenv.config();

export class LoginController {
    login(username: string, password: string): boolean {
        if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
            localStorage.setItem("auth", JSON.stringify({ username }));
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem("auth");
    }

    isAuthenticated(): boolean {
        return localStorage.getItem("auth") !== null;
    }
}