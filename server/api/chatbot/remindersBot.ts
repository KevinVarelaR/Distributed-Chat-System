import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const apiKey = process.env.OPENWEATHER_API_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);
const reminderAlertRegex = /^\/alert\s+(\d+)([mh])\s+(.+)$/;
const reminderWeatherRegex = /^\/clima\s+(?:en\s+)?(.+)$/;
let response = "";

interface Reminder {
    bot_id: string;
    mensaje: string;
    chat_id: number,
    remitente_id: number
}

export default defineEventHandler(async (event) => {
    const reminder: Reminder = await readBody(event);
    if (Number(reminder.bot_id) === 997) {
        await reminderAlert(reminder);
    } else if (Number(reminder.bot_id) === 998) {
        await reminderWeather(reminder);
    } else if (Number(reminder.bot_id) === 999) {
        console.log("Bot de Todifine")
    }
    return response;
});

const reminderWeather = async (reminder: Reminder) => {
    const match = reminder.mensaje.match(reminderWeatherRegex);
    if (!match) {
        await sendMessage(reminder, "No se pudo entender la ciudad. Por favor, sigue el siguiente formato: /weather + {ciudad}");
        return;
    }else{
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&appid=${apiKey}&units=metric&lang=es`;

        try {
            const weatherResponse = await axios.get(url);
            const weatherData = await weatherResponse.data;
    
            if (weatherData.cod !== 200) {
                throw new Error(weatherData.message);
            }
            const weatherMessage = `
            El clima en ${weatherData.name} es:
            - Descripción: ${weatherData.weather[0].description}
            - Temperatura: ${weatherData.main.temp}°C (se siente como ${weatherData.main.feels_like}°C)
            - Temperatura mínima: ${weatherData.main.temp_min}°C
            - Temperatura máxima: ${weatherData.main.temp_max}°C
            - Humedad: ${weatherData.main.humidity}%
            - Presión: ${weatherData.main.pressure} hPa
            - Velocidad del viento: ${weatherData.wind.speed} m/s
            - Dirección del viento: ${weatherData.wind.deg}°
            - Visibilidad: ${weatherData.visibility} metros
            - Amanecer: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            - Atardecer: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            `;
            await sendMessage(reminder, weatherMessage);
        } catch (e) {
            console.log("Error:", e);
            await sendMessage(reminder, "No se pudo obtener la información del clima del lugar especificado.");
        }
    }
    
};

const reminderAlert = async (reminder: Reminder) => {
    const match = reminder.mensaje.match(reminderAlertRegex);
    if (!match) {
        sendMessage(reminder, "No se pudo entender el mensaje. Por favor, sigue el siguiente formato: /alert + {Tiempo} + m(Minutos), h(Horas) + {descripción del recordatorio}");
        return;
    } else {
        const time = Number(match[1]);
        const unit = match[2];
        const message = match[3];
        let delay: number;
        if (unit === "m") {
            delay = time * 60 * 1000;
        } else {
            delay = time * 60 * 60 * 1000;
        }

        setTimeout(async () => {
            sendMessage(reminder, message);
        }, delay);
    }


}

const sendMessage = async (reminder: Reminder, message: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: reminder.chat_id,
                remitente_id: reminder.remitente_id,
                texto: "Atencion: " + message,
                fecha_envio: null,
                temporal: false,
                fecha_expiracion: null
            })
        });
    }
    catch (e) {
        console.log("Error:", e)
    }
}