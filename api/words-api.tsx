export const getWords = async () => {
    const response = await fetch(
        `http://localhost:3000/api/words`, {
           
        }
    )

    
    return response.json();
};


export const getTopics = async () => {
    const response = await fetch(
        `http://localhost:3000/api/topics`, {
           
        }
    )

    
    return response.json();
};

export const getUsersWords= async (uid: string) => {
    const response = await fetch(
        `http://localhost:3000/api/userWords/${uid}`, {
           
        }
    )
    
    return response.json();
};