import fetch from 'node-fetch';

const makeSequentialApiCall = async (apiUrl) => {
    const startTime = new Date();
    let callsMade = 0;

    while (true) {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.log('Error in API call:', response.statusText);
                callsMade++;
                if (callsMade >= 5 || new Date() - startTime >= 300000) {
                    // Cap calls after 5 minutes
                    break;
                }
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error:', error);
            break;
        }
    }
};

export const getAllBooks = async () => {
    const apiUrl = 'https://gutendex.com/books/';
    const books= await makeSequentialApiCall(apiUrl);
    return books;
};

export const searchBooksByTitle = async (title) => {
    const apiUrl = `https://gutendex.com/books/?search=${encodeURIComponent(title)}`;
    const books= await makeSequentialApiCall(apiUrl);
    return books;
};
