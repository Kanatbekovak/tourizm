import React, { useEffect, useMemo, useState } from 'react';
import { Spin, Typography } from 'antd';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { tourService } from '../services/tourService';

const { Title, Text } = Typography;

const DESTINATION_COORDS = {
  bishkek: [42.8746, 74.5698],
  karakol: [42.4907, 78.3936],
  cholponata: [42.6494, 77.0822],
  narin: [41.4287, 75.9911],
  naryn: [41.4287, 75.9911],
  osh: [40.5139, 72.8161],
  jalalabad: [40.9333, 73.0],
  booom: [42.653, 75.826],
  boom: [42.653, 75.826],
  issykkul: [42.3, 77.3],
};

const normalizeDestination = (value = '') => value.toLowerCase().replace(/\s+/g, '');

const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await tourService.getMarketplaceTours();
        setTours(data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const mappedTours = useMemo(() => {
    return tours.map((tour, idx) => {
      const normalized = normalizeDestination(tour.destination);
      const coords = DESTINATION_COORDS[normalized] || [41.5 + (idx % 3) * 0.35, 74.5 + (idx % 4) * 0.55];
      return { ...tour, coords };
    });
  }, [tours]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-[620px]">
            <MapContainer
              center={[41.2044, 74.7661]}
              zoom={7}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mappedTours.map((tour) => (
                <Marker key={tour.id} position={tour.coords} icon={pinIcon}>
                  <Popup>
                    <div className="min-w-52">
                      <div className="font-bold mb-1">{tour.title}</div>
                      <div className="text-gray-600 mb-1">{tour.destination || 'Кыргызстан'}</div>
                      <div className="mb-1">Цена: {tour.promo_price || tour.price || '-'} сом</div>
                      <div className="text-xs text-gray-500">{tour.description || 'Описание пока не добавлено'}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
