import { useState, useEffect } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaf from "leaflet";

// Configurações doLeaf
delete Leaf.Icon.Default.prototype._getIconUrl;
Leaf.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length === 2) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
}

function Map() {
  const [sensorId, setSensorId] = useState("");
  const [sensor, setSensor] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setSensor(null);
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(
        `http://localhost:8000/sensores/${sensorId.trim()}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSensor(data);
    } catch (err) {
      setError("Sensor não encontrado ou erro de permissão. Verifique o ID.");
      setSensor(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Aside />

      <main className="flex-1 p-8 pt-12 flex flex-col gap-8">
        <h1 className="text-charcoal text-4xl font-bold">Localizar Sensor</h1>

        {/* Seção de Busca */}
        <section className="bg-white rounded-[5px] p-6 border border-black">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Buscar sensor por ID
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Digite o ID do sensor"
              value={sensorId}
              onChange={(e) => {
                setSensorId(e.target.value);
                setError("");
              }}
              className="flex-1 border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="ID do sensor"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 px-6 hover:bg-blue-700 transition duration-300"
            >
              BUSCAR
            </button>
          </form>
          {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
        </section>

        
        {sensor && (
          <section className="flex flex-col lg:flex-row gap-8">
            <article className="bg-white rounded-[5px] p-6 border border-black w-full lg:w-1/3 flex flex-col gap-4 h-fit">
              <h2 className="text-2xl font-semibold text-charcoal capitalize">
                {sensor.id} - {sensor.sensor}
              </h2>
              <p className="text-base text-gray-700">
                <span className="font-medium">MAC Address: </span>
                {sensor.mac_address}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-medium">Coordenadas: </span>
                {sensor.latitude}, {sensor.longitude}
              </p>
              <p
                className={`text-xl font-bold ${
                  sensor.status ? "text-blue-500" : "text-red-500"
                }`}
              >
                {sensor.status ? "ATIVO" : "INATIVO"}
              </p>
            </article>

            
            <div
              className="w-full lg:w-2/3 bg-white rounded-[5px] border border-black overflow-hidden"
              style={{ height: "600px" }}
            >
              <MapContainer
                center={[sensor.latitude, sensor.longitude]}
                zoom={15}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <ChangeMapView coords={[sensor.latitude, sensor.longitude]} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[sensor.latitude, sensor.longitude]} />
              </MapContainer>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Map;
