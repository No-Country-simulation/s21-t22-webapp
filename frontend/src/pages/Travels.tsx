import { useParams } from "react-router-dom";
import NavBar from "../components/common/Navbar";

const Travels = () => {
    const { origin, destination, date } = useParams();
    return (
        <div>
            <NavBar />
            <h1>Viajes</h1>
            <p>Origen: {origin}</p>
            <p>Destino: {destination}</p>
            <p>Fecha: {date}</p>
        </div>
    );
};

export default Travels;