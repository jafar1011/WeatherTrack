const country = document.getElementById('country');
const degree = document.getElementById('degree');
const condition = document.getElementById('condition');
const time = document.getElementById('time');

const conditionTranslations = {
    "clear sky": "سماء صافية",
    "few clouds": "غيوم قليلة",
    "scattered clouds": "غيوم متناثرة",
    "broken clouds": "غيوم متقطعة",
    "shower rain": "زخات مطر",
    "rain": "مُمطر",
    "thunderstorm": "عاصفة رعدية",
    "snow": "ثلج",
    "mist": "ضباب",
    "overcast clouds": "غيوم ملبدة"
};

const fetchWeather = async function () {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Iraq&appid=c19631fa07b5ec5bac55d5f00dc21389&units=metric");
        const data = await response.json();
        country.innerHTML = "العراق";
        degree.innerHTML = `${data.main.temp} °C`;

        // translate condition
        const englishCondition = data.weather[0].description.toLowerCase();
        const arabicCondition = conditionTranslations[englishCondition] || englishCondition;
        condition.innerHTML = arabicCondition;
    } catch (error) {
        condition.innerHTML = "خطأ في جلب البيانات";
        console.error("Fetch error:", error);
    }
}

fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000);

function updateTime() {
    time.innerHTML = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000)