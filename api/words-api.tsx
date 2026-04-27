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
    },
    body: JSON.stringify({ wordId, userId }),
  });
  console.log("Using front end post api for user words");

  return res.json();
};

export const getSentences = async (userId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/sentences?userId=${userId}`,
  );
  return response.json();
};

export const generateSentences = async (words: string[]) => {
  const response = await fetch(
    `http://localhost:3000/api/openAI_API/generateSentences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ knownWords: words }),
    },
  );
  return response.json();
};

export const saveSentences = async (
  sentences: { sentence: string; translation: string }[],
  userId: string,
) => {
  const response = await fetch(`http://localhost:3000/api/sentences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sentences, userId }),
  });
  return response.json();
};

export const speakText = async (text: string) => {
  const response = await fetch(`http://localhost:3000/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  return data.audioUrl;
};
