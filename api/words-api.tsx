export const getWords = async () => {
  const response = await fetch(`http://localhost:3000/api/words`, {});

  return response.json();
};

export const getTopics = async () => {
  const response = await fetch(`http://localhost:3000/api/topics`, {});

  return response.json();
};

export const getUsersWords = async (uid: string) => {
  const response = await fetch(
    `http://localhost:3000/api/userWords/${uid}`,
    {},
  );

  return response.json();
};

export const addKnownUserWord = async (wordId: any, userId: any) => {
  console.log("Using front end post api for user words");
 
  const res = await fetch(`http://localhost:3000/api/userWords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ wordId, userId }),
  });
  console.log("Using front end post api for user words");

  return res.json();
};

export const getSentences = async () => {
  const response = await fetch(`http://localhost:3000/api/sentences`, {});
  return response.json();
};