import React, { useRef, useState, useCallback, useEffect } from "react";
import Globe from "react-globe.gl";

const GlobeComponent = ({
  onOpen,
  isOpen,
  zoomValue,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [clickedCountry, setClickedCountry] = useState();

  const globeEl = useRef();

  const handleSearchCountry = () => {
    for (let i = 0; i < countries.features.length; i++) {
      if (
        countries.features[i].properties.country_name === selectedCountry.name
      ) {
        handleClickCountry(countries.features[i], 1, 1, 1, 1);
        break;
      }
    }
  };

  const handleClickCountry = (polygon, event, { lat, lng, altitude }) => {
    const latc = polygon.properties.central_lat;
    const lngc = polygon.properties.central_lng;
    const altitudec = polygon.properties.central_alt;

    globeEl.current.pointOfView(
      { lat: latc, lng: lngc, altitude: altitudec },
      500
    );

    setSelectedCountry((prevState) => ({
      ...prevState,
      name: polygon.properties.country_name,
      iso_code_2: polygon.properties.iso_code_2,
    }));
    setClickedCountry(polygon);
    setHoverD(polygon);
    onOpen();

    console.log(globeEl.current.getScreenCoords(lat, lng));

    //console.log(globeEl.current.controls());
  };

  useEffect(() => {
    fetch("./custom.geojson")
      .then((res) => res.json())
      .then(setCountries)
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  //prevent rerender when hovering the country
  const handleHover = useCallback(
    (d) => {
      if (isOpen) {
        setHoverD(clickedCountry);
        return;
      }
      if (d !== hoverD) setHoverD(d);
    },
    [hoverD, isOpen, clickedCountry, selectedCountry.name]
  );

  useEffect(() => {
    if (selectedCountry.name) {
      handleSearchCountry();
    }
  }, [selectedCountry.name]);

  // set ref after globe is ready/not null so its doesnt crash
  useEffect(() => {
    if (!globeEl.current) {
      return;
    }

    globeEl.current.controls().maxDistance = 500;
    globeEl.current.controls().minDistance = 135;
  }, [isGlobeReady]);

  // change zoom sens
  useEffect(() => {
    const controls = globeEl.current.controls();
    controls.addEventListener("change", () => {
      controls.zoomSpeed = 1;
    });
  }, [globeEl]);

  //reverse zoom
  useEffect(() => {
    globeEl.current.pointOfView({ altitude: 2.3 - zoomValue });
  }, [zoomValue]);

  return (
    <div>
      <Globe
        ref={globeEl}
        onGlobeReady={() => setIsGlobeReady(true)}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        polygonsData={countries.features}
        polygonSideColor={() => "rgba(0, 0, 0, 0.15)"}
        polygonStrokeColor={() => "#000"}
        polygonAltitude={(d) => (d === hoverD ? 0.03 : 0.01)}
        polygonCapColor={(d) => (d === hoverD ? "#006fee" : "#626262")}
        polygonLabel={(d) =>
          `<b>${isOpen ? "" : d.properties.country_name}</b>`
        }
        polygonsTransitionDuration={300}
        onPolygonClick={handleClickCountry}
        onPolygonHover={handleHover}
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
};

export default GlobeComponent;
