import React, { useState, useEffect } from "react"
import { fetchClimaData } from "../Helpers/apiClima"
import '../style/Clima.css'

export const Clima = () => {
    const [climaData, setclimaData] = useState(null)
    const [ciudad, setCiudad] = useState('')
    const [error, seterror] = useState(null)
    const dif_kelvin = 273.5

    const handleCiudadCambio = (e) => {
        setCiudad(e.target.value);
    }

    const handleSubmmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) {

            fetchClimaData(ciudad, setclimaData, seterror);
            seterror(null)
            if (seterror.length > 0){
                setclimaData(null)
            }

        }

    }

    return (
        <div className="container">
            <h2>El clima : Ciudades del mundo</h2>
            <form onSubmit={handleSubmmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCiudadCambio}
                    placeholder="Ingrese Ciudad"
                />
                <button type="submmit" className="btn btn-primary">Buscar</button>
            </form>
            {error &&
                (
                    <div>
                        <h3 style={{ color: "red" }}>{error}</h3>
                    </div>
                )
            }

            {climaData && Object.keys(climaData).length > 0 && (
                <div>
                    <h2>{climaData.name}</h2>
                    <p>Temperatura:{parseInt(climaData.main?.temp - dif_kelvin)}°C</p>
                    <p>Condicion:{climaData.weather[0]?.description}</p>
                    <img src={`https://openweathermap.org/img/wn/${climaData.weather[0].icon}@2x.png`}></img>
                </div>
            )}
        </div>

    )
}
