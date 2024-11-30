document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch Daily Activity Recommendations
    async function fetchActivityRecommendations() {
        try {
            const response = await fetch('https://wger.de/api/v2/exercise/?language=2'); // English exercises
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            
            // Display a random exercise
            const exercises = data.results || [];
            const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
            const exerciseName = randomExercise.name || "Unnamed Exercise";
            const exerciseDescription = randomExercise.description || "No description available.";
            
            document.getElementById('activityRecommendation').innerHTML = `
                <h3>${exerciseName}</h3>
                <p>${exerciseDescription}</p>
            `;
        } catch (error) {
            document.getElementById('activityRecommendation').innerText = 'Unable to fetch activity recommendations.';
            console.error(error);
        }
    }
    
    // Function to fetch Weather-Based Suggestions
    async function fetchWeatherSuggestions() {
        try {
            const apiKey = "ae82236f5033942c7f3037ef7fdb7066"; 
            const city = document.getElementById("countryInput").value.trim(); // Get the city input from the user
            
            if (!city) {
                document.getElementById('weatherSuggestion').innerText = 'Please enter a city.';
                return;
            }
            
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
    
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.cod !== 200) {
                document.getElementById('weatherSuggestion').innerText = `Error: ${data.message}`;
                return;
            }
            
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            document.getElementById('weatherSuggestion').innerText = `It’s ${Math.round(temperature)}°C with ${weatherDescription}. Perfect for a jog!`;
        } catch (error) {
            document.getElementById('weatherSuggestion').innerText = 'Unable to fetch weather data.';
            console.error(error);
        }
    }
    
    // Add event listener to the button
    document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeatherSuggestions);
    

    // Call the functions to fetch data and update the sections
    fetchActivityRecommendations();
    fetchWeatherSuggestions();
});
