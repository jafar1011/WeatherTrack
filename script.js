const country = document.getElementById('country');
const degree = document.getElementById('degree');
const condition = document.getElementById('condition');
const time = document.getElementById('time');
const date = document.getElementById('date');
const image = document.getElementById('image');

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

const weatherCodeMap = {
    0: "clear sky",
    1: "few clouds",
    2: "scattered clouds",
    3: "broken clouds",
    45: "mist",
    48: "mist",
    51: "shower rain",
    53: "shower rain",
    55: "shower rain",
    61: "rain",
    63: "rain",
    65: "rain",
    66: "shower rain",
    67: "shower rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snow",
    80: "shower rain",
    81: "shower rain",
    82: "shower rain",
    85: "snow",
    86: "snow",
    95: "thunderstorm",
    96: "thunderstorm",
    99: "thunderstorm"
};

function updateBackground(conditionKey) {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const timeOfDay = isDay ? "day" : "night";

    const isRainy = conditionKey.includes("rain") || conditionKey.includes("thunderstorm");
    const imageFile = isRainy ? `rainy-${timeOfDay}.gif` : `sunny-${timeOfDay}.png`;

    image.src = `sources/${imageFile}`;
    updateMusic(isRainy);
}

function updateMusic(isRainy) {
    const music = document.getElementById('music');
    const musicSource = document.getElementById('musicSource');

    const newSrc = isRainy ? "sources/rainymusic.mp3" : "sources/music.mp3"; // <-- path updated

    if (musicSource.getAttribute('src') !== newSrc) {
        music.pause();
        musicSource.setAttribute('src', newSrc);
        music.load();
        music.play();
    }
}

const fetchWeather = async function () {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=33.3152&longitude=44.3661&current_weather=true"
        );
        const data = await response.json();

        country.innerHTML = "بغداد";
        const temp = data.current_weather.temperature;
        degree.innerHTML = `${temp} °C`;
        const code = data.current_weather.weathercode;
        const englishCondition = weatherCodeMap[code] || "unknown";
        const arabicCondition = conditionTranslations[englishCondition] || englishCondition;

        condition.innerHTML = arabicCondition;

        updateBackground(englishCondition);
    } catch (error) {
        condition.innerHTML = "خطأ في جلب البيانات";
        console.error("Fetch error:", error);
    }
}

fetchWeather();
setInterval(fetchWeather, 5 * 60 * 1000);

function updateTime() {
    time.innerHTML = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Gregorian date (Arabic)
const today = new Date();
const gregorianDate = today.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

// Hijri date
const hijriDate = today.toLocaleDateString('ar-EG-u-ca-islamic', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

date.innerHTML = `ميلادي: ${gregorianDate} <br> هجري: ${hijriDate}`;

document.body.addEventListener('click', () => {
    const music = document.getElementById('music');
    music.muted = false;
    music.play();
});
