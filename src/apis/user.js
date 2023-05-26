const API_USER = "/api/user";

export async function createUser(newUser) {
  const response = await fetch(`${API_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const responseFromBackend = await response.json();
  console.log(response.ok);
  if (response.ok) {
    if (responseFromBackend === "User exist") {
      throw new Error('Utilisateur déjà existant');
    } else {
      return responseFromBackend;
    }
  } else {
    if (responseFromBackend) {
      throw responseFromBackend;
    } else {
      throw new Error("Error Api CreateUser");
    }
  }
}
