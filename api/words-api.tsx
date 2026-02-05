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