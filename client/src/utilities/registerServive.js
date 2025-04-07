export const registerUser = async (username, password) => {
    try {
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: data.error || "Failed to register user" }; //fallback error message
        }

        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};