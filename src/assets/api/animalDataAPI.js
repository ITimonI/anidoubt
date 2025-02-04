import { API_NINJAS_API_KEY } from "../../config";

const API_URL = 'https://api.api-ninjas.com/v1/animals';

export async function fetchAnimalData(name) {
    try {
        const response = await fetch(`${API_URL}?name=${name}`, {
            headers: { 'X-Api-Key': API_NINJAS_API_KEY }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching animal data:', error);
        throw error;
    }
}