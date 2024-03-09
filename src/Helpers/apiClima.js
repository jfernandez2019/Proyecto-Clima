export const fetchClimaData = async (ciudad, setClimaData, setError) => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = 'afed406f60564480d3d7101ac989f6c7';

    try {
        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`);

        if (response.ok) {
            const data = await response.json();

            if (Object.keys(data).length > 0) {
                setClimaData(data);
            } else {
                setError('LA API NO DEVOLVIÓ DATOS VÁLIDOS');
            }
        } else if (response.status === 400) {
            setError('Ciudad no encontrada');
        } else {
            setError(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

    } catch (error) {
        setError(`Error en el fetch: ${error.message}`);
    }
};


