import dotenv from "dotenv";
import open from "open";

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

function mostActiveRover(rovers) {
  const sortedRovers = rovers.sort(
    (a, b) => new Date(b.max_date) - new Date(a.max_date),
  );
  return sortedRovers[0];
}

async function fetchRoverImages(roverName, date) {
  roverName = roverName.toLowerCase();
  const url =
    ROVERS_API_URL +
    `/${roverName}/photos?earth_date=${date}&api_key=${api_key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data["photos"];
  } catch (error) {
    console.log(`Error fetching image from Rover:`, error);
    return [];
  }
}

const rovers = await fetchRovers();
const latestRover = mostActiveRover(rovers);
const latestImages = await fetchRoverImages(
  latestRover.name,
  latestRover.max_date,
);
const imageUrl = latestImages[0].img_src;
open(imageUrl);
