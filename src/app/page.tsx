"use client"

import styles from "./page.module.css"
import React, { useEffect, useState } from "react";

function getCurrentDate() {
  const currentDate = new Date();
  // return currentDate.toISOString().split("T")[0]; // format: YYYY-MM-DD
  const options: any = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date
}

export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [city, setCity] = useState("");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch("http://localhost:3000/api/weather?address=" + cityName)
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // fetchData(city);
  }, [city])

  console.log(weatherData, city);
  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form
          className={styles.weatherLocation}
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
        >
          <input className={styles.input_field} onChange={(e)=>setCity(e.target.value)} value={city} placeholder="Enter city"/>
          <button className={styles.search_button} onClick={(e)=>{
            e.preventDefault();
            fetchData(city);
          }}>Search</button>
        </form>
        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i className="wi wi-day-cloudy"></i>
              </div>
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>
                    {((weatherData?.main?.temp) - 273.5).toFixed(2) + String.fromCharCode(176)}
                  </span>
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
              </div>
            </div>
            <div className={styles.place} >{weatherData?.name}</div>
            <div className={styles.date}>{date}</div>
          </>) : (
          <div className={styles.place}>Loading...</div>
        )}
      </article>
    </main>
  );
}
