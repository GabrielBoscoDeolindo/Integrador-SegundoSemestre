import { useState, useEffect } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaf from "leaflet";


delete Leaf.Icon.Default.prototype._getIconUrl;
Leaf.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords);
    }
  }, [coords, map]);
  return null;
}

function Map() {
  const [sensorId, setSensorId] = useState("");
  const [sensor, setSensor] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`http://localhost:8000/sensores/${sensorId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSensor(data);
    } catch (err) {
      alert("Sensor não encontrado ou erro de permissão.");
      setSensor(null);
    }
  };

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Buscar sensor por ID</p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite o ID do sensor"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
            className="border p-2"
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white font-semibold rounded-[5px] p-2 hover:bg-blue-700">
            BUSCAR
          </button>
        </div>

        {sensor && (
          <>  
          <div className="flex gap-80">

            <div className="flex flex-col gap-2 w-[350px] h-[120px] bg-sensor border-[2px] border-charcoal p-2">
              <p className="text-[20px] font-bold capitalize">{sensor.id} - {sensor.sensor}</p>
              <p className="text-[12px] font-bold">Mac address: {sensor.mac_address}</p>
              <p className="text-[18px] font-bold">Coordenadas: {sensor.latitude}, {sensor.longitude}</p>
            </div>

            <div className="border-4"> 
              <MapContainer center={[sensor.latitude, sensor.longitude]} zoom={15} style={{ width: "700px", height: "700px", overflow: "hidden" }}>
                <ChangeMapView coords={[sensor.latitude, sensor.longitude]} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={[sensor.latitude, sensor.longitude]}></Marker>
              </MapContainer>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Map;
