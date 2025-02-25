import { useState } from "react";
import { calcularDistancia } from "../utils/test/calcularDistancia";
import { estimarTiempo } from "../utils/test/estimarTiempo";

const TestPage = () => {
    const [ciudad, setCiudad] = useState("");
    const [resultado, setResultado] = useState<any>(null);
    const [lat, setLat] = useState<number | "">("");
    const [lon, setLon] = useState<number | "">("");
    const [distancia, setDistancia] = useState<number | null>(null);
    const [tiempo, setTiempo] = useState<number | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ciudad) return;

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ciudad)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                setResultado(data[0]);
                setLat(parseFloat(data[0].lat));
                setLon(parseFloat(data[0].lon));
            } else {
                setResultado(null);
                setLat("");
                setLon("");
            }
        } catch (error) {
            console.error("Error al obtener datos de OpenStreetMap", error);
        }
    };

    const handleCalculateDistance = (e: React.FormEvent) => {
        e.preventDefault();
        if (lat !== "" && lon !== "") {
            const distanciaCalculada = calcularDistancia(lat, lon);
            const tiempoCalculado = estimarTiempo(distanciaCalculada);
            setTiempo(tiempoCalculado);
            setDistancia(distanciaCalculada);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Buscar Ciudad en OpenStreetMap</h1>
            <form onSubmit={handleSearch} className="space-y-2">
                <input
                    type="text"
                    placeholder="Ingrese una ciudad..."
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Buscar
                </button>
            </form>

            {resultado && (
                <div className="mt-4 p-3 border rounded bg-gray-100">
                    <h2 className="font-semibold">{resultado.display_name}</h2>
                    <p><strong>Latitud:</strong> {resultado.lat}</p>
                    <p><strong>Longitud:</strong> {resultado.lon}</p>
                </div>
            )}

            <hr className="my-4" />

            <h2 className="text-lg font-semibold mb-2">Obtener distancia</h2>
            <form onSubmit={handleCalculateDistance} className="space-y-2">
                <input
                    type="number"
                    placeholder="Latitud"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Longitud"
                    step="any"
                    value={lon}
                    onChange={(e) => setLon(parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Calcular Distancia
                </button>
            </form>

            {distancia !== null && (
                <p className="mt-4 text-lg font-semibold">
                    Distancia: {distancia.toFixed(2)} km
                    <br />
                    Tiempo: {tiempo?.toFixed(2)} horas
                </p>
            )}
        </div>
    );
};

export default TestPage;
