import React, { useState, Fragment, useEffect, useCallback, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

//Leaflet libray
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  ZoomControl,
  Polygon,
  Polyline
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.motion/dist/leaflet.motion.js';
import 'react-leaflet-fullscreen/dist/styles.css';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'leaflet-routing-machine';

//React Boostrap
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

//Char  Librarian
import { LineChart } from '@opd/g2plot-react';

//Components
import Test from '@/Shared/test';
import TextInput from '@/Shared/TextInput';

export default () => {
  const mapRef = useRef();

  const { devices: initialDevices, geocercas, groups } = usePage().props;
  const [devices, setDevices] = useState(initialDevices);
  
  useEffect(() => {
    // Configura un intervalo para realizar la actualización cada 10 segundos
    const intervalId = setInterval(() => {
      axios.get('/info')
        .then(function (response) {
          // Maneja la respuesta exitosa
          setDevices(response.data.devices); // Actualiza el estado de `devices`
        })
        .catch(function (error) {
          // Maneja el error
          console.log(error);
        });
    }, 10000); // 5000 milisegundos son 5 segundos
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const [address, setAddress] = useState('');

  function getAdress(lat, lng) {
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(function (response) {
        // Maneja la respuesta exitosa
        const address = response.data.display_name;

        setAddress(address)
      })
      .catch(function (error) {
        // Maneja el error
        console.log(error);
      });
  }
  
  const styleMap = { width: '100%', height: '85vh' };

  const newicon = new L.Icon({
    iconUrl: '../../../images/icon.png',
    iconAnchor: [10, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 45]
  });

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }
    });

    return position === null ? null : (
      <Marker position={position} icon={newicon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const MAP_PROVIDERS = {
    google: {
      satellite: 'Google Satellite',
      roadmap: 'Google Roadmap'
    },
    osm: 'OpenStreetMap (Mapnik)',
    yandex: {
      satellite: 'Yandex Satellite',
      roadmap: 'Yandex Roadmap'
    },
    mapbox: 'Mapbox'
  };

  const tiles = [
    {
      attribution: '&copy; Google',
      name: MAP_PROVIDERS.google.satellite,
      checked: false,
      url: '//mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      crs: L.CRS.EPSG3857
    },
    {
      attribution: '&copy; Google',
      name: MAP_PROVIDERS.google.roadmap,
      checked: false,
      url: '//mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      crs: L.CRS.EPSG3857
    },
    {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      name: MAP_PROVIDERS.osm,
      checked: true,
      url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      crs: L.CRS.EPSG3857
    }
  ];

  const { data, setData, errors, post, processing } = useForm({
    nombre: '',
    longitudes: [],
    id_grupo: 0
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const passGeocerca = geocerca => {
    handleShow();
    data.longitudes = geocerca;
  };

  function handleSubmit(e) {
    e.preventDefault();
    post(route('geocerca.store'));
  }

  const purpleOptions = { color: 'black', fillColor: 'blue' };

  const [mapContext, setMapContext] = useState();

  const history = useSelector(store => store.history);

  let instance;
  function handleAddMarkerClick() {
    setStartButton(false);

    if (history && history.length > 0) {
      const waypoints = history.map(route => L.latLng(route[0], route[1]));

      console.log("Waypoints: ", waypoints);

      L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        show: false,
        addWaypoints: false,
        createMarker: () => null
      }).addTo(mapContext);
    }


    // instance = L.motion.polyline(
    //   history,
    //   {
    //     color: 'red'
    //   },
    //   {
    //     auto: true,
    //     duration: 40000
    //   },
    //   {
    //     removeOnEnd: false,
    //     showMarker: true,
    //     icon: L.icon({
    //       iconUrl:
    //         'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png',
    //       iconSize: [20, 30]
    //     })
    //   }
    // );

    // mapContext && mapContext.addLayer(instance);
  }

  const [playButton, setPlayButton] = useState(true);
  const [startButton, setStartButton] = useState(true);

  function playRoute() {
    setPlayButton(true);
    instance.motionResume();
  }

  function pauseRoute() {
    setPlayButton(false);
    instance.motionPause();
  }

  function stopRoute() {
    instance.motionStop();
  }

  // Actualiza el estado compartido
  const styleContainerModal = {
    position: 'fixed',
    bottom: '0',
    width: '90%',
    height: '30vh',
    paddingBottom: '16px',
    background: '#ffffff',
    zIndex: 2000,
    verticalAlign: 'top'
  };

  const speeds = useSelector(store => store.speed);

  const config = {
    height: 200,
    xField: 'date',
    yField: 'speed',
    smooth: true,
    meta: {
      value: {
        max: 15
      }
    },
    data: speeds
  };

  const getChart = useCallback(chart => {
    //console.log(chart);
  }, []);

  const getContainer = useCallback(container => {
    //console.log(container);
  }, []);

  const [deviceRoutes, setDeviceRoutes] = useState([]);

  useEffect(() => {
    setDeviceRoutes(devices.map(device => device.lastLocations.map(location => [location.lat, location.lng])));
  }, [devices]);

  function Routing({ deviceRoutes }) {
    useEffect(() => {
      if (deviceRoutes && deviceRoutes.length > 0) {
        const waypoints = deviceRoutes.map(route => L.latLng(route[0], route[1]));
  
        L.Routing.control({
          waypoints,
          routeWhileDragging: true,
          show: false,
          addWaypoints: false,
          createMarker: () => null 
        }).addTo(mapContext);
      }
    }, [deviceRoutes, mapContext]);
  
    return null;
  }

  return (
    <>
      <Fragment>
        <MapContainer
          style={styleMap}
          center={{ lat: 4.831111, lng: -75.697815 }}
          zoom={6}
          zoomControl={false}
          whenReady={event => setMapContext(event.target)}
          whenCreated={mapInstance => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://tecnolab.com.co/">Tecnolab</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LayersControl position="topright">
            {tiles.map(({ attribution, checked, name, subdomains, url }) => {
              const tileLayerProps = {
                attribution,
                url,
                name
              };
              if (subdomains) {
                tileLayerProps.subdomains = subdomains;
              }
              return (
                <LayersControl.BaseLayer
                  checked={!!checked}
                  key={name}
                  name={name}
                >
                  <TileLayer maxNativeZoom={19} {...tileLayerProps} />
                </LayersControl.BaseLayer>
              );
            })}
          </LayersControl>

          <FullscreenControl position="topright" />

          <ZoomControl position="topright" />

          <Test passGeocerca={passGeocerca} />

          {geocercas.map(({ id, nombre, longitudes }) => {
            return (
              <Polygon
                key={id}
                pathOptions={purpleOptions}
                positions={JSON.parse(longitudes)}
              />
            );
          })}

          {devices.map(({ id, placa, lng, lat, fecha, hora, speed }) => {
            return lat > '' ? (
              <Marker key={id} position={[lat, lng]} icon={newicon}>
                <Popup>
                  <div style={{ fontSize: '0.5em' }}>
                    <p>{placa}</p>
                    <hr />
                    <p><strong>Última conexión:</strong> {fecha}, {hora}</p>
                    <p><strong>Velocidad:</strong> {speed} km/h</p>
                    <p><strong>Dirección:</strong> { getAdress(lat, lng) } { address }</p>
                    <p><strong>Coordenadas:</strong> <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" rel="noopener noreferrer">{lat}, {lng}</a></p>
                  </div>
                </Popup>
              </Marker>
            ) : (
              ''
            );
          })}

          {deviceRoutes.map((routePoints, index) => (
            // <Polyline key={index} positions={routePoints} />
            <Routing deviceRoutes={routePoints} />
          ))}
        </MapContainer>

        {history.length > 0 && (
          <div style={styleContainerModal}>
            <div className="d-flex justify-content-center">
              <ButtonGroup aria-label="Basic example" style={{}}>
                {startButton ? (
                  <Button variant="secondary" onClick={handleAddMarkerClick}>
                    <i className="fas fa-play"></i>
                  </Button>
                ) : (
                  <>
                    {playButton ? (
                      <Button variant="secondary" onClick={pauseRoute}>
                        <i className="fas fa-pause"></i>
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={playRoute}>
                        <i className="fas fa-play"></i>
                      </Button>
                    )}
                    <Button variant="secondary" onClick={stopRoute}>
                      <i className="fas fa-stop-circle"></i>
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </div>

            <LineChart {...config} ref={getContainer} chartRef={getChart} />
          </div>
        )}
      </Fragment>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Geocerca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <TextInput
                className="mb-3"
                label="Nombre"
                name="nombre"
                type="text"
                errors={errors.nombre}
                value={data.nombre}
                onChange={e => setData('nombre', e.target.value)}
              />
            </Form.Group>

            <Form.Group
                className="mb-3"
                onChange={e => setData('grupo', e.target.value)}
              >
                <Form.Label htmlFor="disabledSelect">Grupo</Form.Label>
                <Form.Select id="disabledSelect">
                  <option value="0">Seleccionar</option>

                  {groups.data.map(({ id, nombre }, index) => {
                    return (
                      <option key={index} value={id}>
                        {nombre}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Guardar Geocerca
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
