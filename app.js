document
  .querySelector(".find-location")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const location = e.target.querySelector('input[type="text"]').value;

    try {
      const response = await fetch(
        "https://weather-backend-jkgz.onrender.com/api/weather?location=${location}"
      );
      const data = await response.json();

      console.log("Full response data:", data); // Log to check all available fields

      if (data.current) {
        // Update location and temperature
        const locationEl = document.querySelector(".location");
        if (locationEl) locationEl.textContent = data.location.name;

        const tempEl = document.querySelector(".num");
        if (tempEl) tempEl.textContent = `${data.current.temperature}°C`;

        // Update weather icon
        const iconEl = document.querySelector("#weather-icon");
        if (iconEl)
          iconEl.src = data.current.weather_icons
            ? data.current.weather_icons[0]
            : "images/icons/default.svg";

        // Update day and date
        const dayEl = document.querySelector(".day");
        const dateEl = document.querySelector(".date");
        if (dayEl)
          dayEl.textContent = new Date().toLocaleDateString("en-us", {
            weekday: "long",
          });
        if (dateEl)
          dateEl.textContent = new Date().toLocaleDateString("en-us", {
            day: "numeric",
            month: "short",
          });

        // Update additional information
        const precipitationEl = document.querySelector(
          ".forecast-content .precipitation"
        );
        const windSpeedEl = document.querySelector(
          ".forecast-content .wind-speed"
        );
        const windDirEl = document.querySelector(".forecast-content .wind-dir");

        // Use the fields from the API response directly
        if (precipitationEl)
          precipitationEl.textContent = `${data.current.precip} mm`; // Changed to mm
        if (windSpeedEl)
          windSpeedEl.textContent = `${data.current.wind_speed} km/h`;
        if (windDirEl) windDirEl.textContent = data.current.wind_dir;
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch weather data");
    }
  });
