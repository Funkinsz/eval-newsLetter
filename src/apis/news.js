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

export async function readPage(user) {
  console.log(user);
  const response = await fetch(API + "/read?user=" + user);
  return response.json();
}

export async function readViews(user) {
  const response = await fetch(API + "/moreView?user=" + user);
  return response.json();
}

export async function readLike(user) {
  const response = await fetch(API + "/moreLike?user="  + user);
  return response.json();
}

export async function readNews(user) {
  const response = await fetch(`${API}/readHome?user=${user}`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readLast(user) {
  const response = await fetch(`${API}/last?user=${user}`);
  const resFromBack = await response.json();
  if (response.ok) {
    return resFromBack;
  } else {
    throw new Error("Read Error");
  }
}

export async function readTheme(data) {
  console.log(data);
  const response = await fetch(
    `${API}/theme?t=${data.theme}&user=${data.user}`
  );
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

export async function readResume(data) {
  console.log(data);
  const response = await fetch(
    `${API}/resume?id=${data.id}&user=${data.user}`
  );
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

export async function newsLiked(data) {
  try {
    const response = await fetch(API + "/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const resFromBack = await response.json()
      return resFromBack;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function readMyLikes(user) {
  console.log(user);
  const response = await fetch(API + "/myLikes?user=" + user.id)
  if (response.ok) {
    return await response.json()
  }
}