import { useEffect, useState } from "react";

type Travel = {
    id: number;
    origin: string;
    destination: string;
    date: Date;
}

const TravelsList = ({ travels }: { travels: Travel[] }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<Travel[]>([]);

    console.log("Travels:", travels);
    useEffect(() => {
        console.log("Travels:", travels);
    }, [travels]);

    return (
        <div>
            <h1>Listado de Viajes</h1> 
        </div>
    );
};

export default TravelsList;