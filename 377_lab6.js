// Initialize map
const map = L.map('map').setView([37.0902, -95.7129], 4); // Central US
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Random coordinate generator function
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate random coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

// Display markers and fetch locality
coordinates.forEach(async (coord, index) => {
    // Add marker to map
    const marker = L.marker([coord.lat, coord.lon]).addTo(map);

    // Fetch locality data
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lon}&localityLanguage=en`);
    const data = await response.json();

    // Display marker text and locality
    const markerElement = document.getElementById(`marker${index + 1}`);
    markerElement.innerText = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lon}\nLocality: ${data.locality || 'Not Found'}`;
});
