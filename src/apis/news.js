const API = "/api/news"

export async function addNews(addNews) {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addNews)
    })
    const resFromBack = await response.json()
    if (response.ok) {
        return resFromBack
    } else {
        throw new Error("Insert Error")
    }
}

export async function readNews() {
    const response = await (fetch(`${API}/read`))
    const resFromBack = await response.json()
    if (response.ok) {
        return resFromBack
    } else {
        throw new Error("Read Error")
    }
}