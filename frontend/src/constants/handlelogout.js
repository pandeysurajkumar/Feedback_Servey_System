import { VITE_API_URL } from "../config";

export async function handleLogout() {
    try {
        const response = await fetch(`${VITE_API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (response.ok) {
        return true;
        } else {
        throw new Error("Failed to logout");
        }
    } catch (err) {
        console.error(err.message);
        return false;
    }
}