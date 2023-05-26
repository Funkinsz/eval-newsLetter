const API_USER = "/api/auth";

export async function signin(credentials) {
  const response = await fetch(API_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const responseFromBack = await response.json();
    if (responseFromBack) {
      return responseFromBack;
    } else {
      throw responseFromBack;
    }
  } else {
    throw new Error("Erreur de connexion");
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_USER}/current`, {
    credentials: "include"
  });
  return await response.json();
}

export async function signout() {
  await fetch(API_USER, {
    method: "DELETE",
  });
}
