const BASE_URL = "http://localhost:3000";

export const getWords = async () => {
  const response = await fetch(`${BASE_URL}/api/words`, {});

  return response.json();
};

export const getTopics = async () => {
  const response = await fetch(`${BASE_URL}/api/topics`, {});

  return response.json();
};

export const getUsersWords = async (uid: string) => {
  const response = await fetch(`${BASE_URL}/api/userWords/${uid}`, {});

  return response.json();
};

export const addKnownUserWord = async (wordId: any, userId: any) => {
  console.log("Using front end post api for user words");

  const res = await fetch(`${BASE_URL}/api/userWords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wordId, userId }),
  });
  console.log("Using front end post api for user words");

  return res.json();
};

export const getSentences = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/sentences?userId=${userId}`);
  return response.json();
};

export const generateSentences = async (words: string[]) => {
  const response = await fetch(`${BASE_URL}/api/openAI_API/generateSentences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ knownWords: words }),
  });
  return response.json();
};

export const saveSentences = async (
  sentences: { sentence: string; translation: string }[],
  userId: string,
) => {
  const response = await fetch(`${BASE_URL}/api/sentences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sentences, userId }),
  });
  return response.json();
};

export const speakText = async (text: string) => {
  const response = await fetch(`${BASE_URL}/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  return data.audioUrl;
};

export const updateUserWord = async (
  wordId: string,
  userId: string,
  correct: boolean,
) => {
  const response = await fetch(
    `${BASE_URL}/api/userWords/${userId}/${wordId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correct }),
    },
  );
  return response.json();
};
