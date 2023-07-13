import { createContext, useRef, useState } from "react";
import { FeatureCollection } from "geojson";

interface MapContextType {
  map: any;
}

interface MapGeometryContextType {
  mapGeometry: FeatureCollection | null;
  setMapGeometry: (mapGeometry: FeatureCollection) => void;
}

export const MapContext = createContext<MapContextType>({ map: null });

export const MapGeometryContext = createContext<MapGeometryContextType>({
  mapGeometry: null,
  setMapGeometry: () => {},
});

export default function Context({ children }) {
  const map = useRef(null);
  const [mapGeometry, setMapGeometry] = useState<FeatureCollection | null>(
    null,
  );

  return (
    <MapContext.Provider value={{ map }}>
      <MapGeometryContext.Provider value={{ mapGeometry, setMapGeometry }}>
        {children}
      </MapGeometryContext.Provider>
    </MapContext.Provider>
  );
}
