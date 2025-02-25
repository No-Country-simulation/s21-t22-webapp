import { useState } from "react";

const TestPage = () => {
    const [ciudad, setCiudad] = useState("");
    const [resultado, setResultado] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ciudad) return;

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ciudad)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                setResultado(data[0]); // Tomamos la primera coincidencia
            } else {
                setResultado(null);
            }
        } catch (error) {
            console.error("Error al obtener datos de OpenStreetMap", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Buscar Ciudad en OpenStreetMap</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
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
        </div>
    );
};

export default TestPage;
