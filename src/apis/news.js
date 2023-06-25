const API = "/api/news";

export async function addNews(addNews) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addNews),
  });
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Insert Error");
  }
}

export async function readPage() {
  const response = await fetch(API + "/read")
  return response.json()
}

export async function readViews() {
  const response = await fetch(API + "/moreView")
  return response.json()
}

export async function readNews() {
  const response = await fetch(`${API}/readHome`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readLast() {
  const response = await fetch(`${API}/last`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readTheme(data) {
  const response = await fetch(`${API}/theme?t=${data}`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readMusic() {
  const response = await fetch(`${API}/musique`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readCine() {
  const response = await fetch(`${API}/cinema`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readJV() {
  const response = await fetch(`${API}/jv`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readEvent() {
  const response = await fetch(`${API}/event`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readResume(id) {
  const response = await fetch(`${API}/resume?id=${id}`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function countNews(id) {
  const response = await fetch(`${API}/count?id=${id}`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}
