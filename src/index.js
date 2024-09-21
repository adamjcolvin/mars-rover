import dotenv from "dotenv";
dotenv.config();

const api_key = process.env.NASA_API_KEY;
const ROVERS_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;

async function fetchRovers() {
  const url = ROVERS_API_URL + `?api_key=${api_key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data["rovers"];
  } catch (error) {
    console.log(`Error fetching image from Rover:`, error);
    return [];
  }
}

const rovers = await fetchRovers();
console.log(rovers);
