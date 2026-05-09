"use client";
import { useEffect, useRef } from "react";

export default function GoogleSignIn() {
    const googleButton = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            window.google.accounts.id.initialize({
                client_id: "102621798557-slottudnqi91ro3amqckq1lpt78cpioh.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });

            window.google.accounts.id.renderButton(
                googleButton.current!,
                { theme: "outline", size: "large" } // Customization options
            );
        }
    }, []);

    async function handleCallbackResponse(response: any) {
        const idToken = response.credential;
        console.log("Encoded JWT ID token: " + idToken);

        // SEND THIS TO YOUR BACKEND API FOR VERIFICATION
        const res = await fetch("/api/auth/google", {
            method: "POST",
            body: JSON.stringify({ token: idToken }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (data.success) {
            // Handle successful login (e.g., redirect or set state)
        }
    }

    return <div ref={googleButton}></div>;
}