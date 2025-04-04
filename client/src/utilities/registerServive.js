export const registerUser = async (username, password) => {
    try {
        // Send a POST request to the server
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Failed to register user");
        }

        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};