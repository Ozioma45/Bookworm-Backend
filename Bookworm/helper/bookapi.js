import fetch from 'node-fetch';

export const  getAllBooks=async()=>{
    try {
        const apiUrl = 'https://gutendex.com/books/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all books:', error);
        return null;
    }
}

export const searchBooksByTitle= async(title)=>{
    try {
        const apiUrl = `https://gutendex.com/books/?search=${encodeURIComponent(title)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching for books:', error);
        return null;
    }
}

