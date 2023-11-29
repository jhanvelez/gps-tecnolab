import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TextInput from '@/Shared/TextInput';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useDispatch } from 'react-redux';

/** Boostrap components */
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import { setHistory } from '@/app/states/history';
import { setSpeed } from '@/app/states/speed';

export default ({}) => {
  const dispatch = useDispatch();

  const { devices, events, drivers, groups } = usePage().props;

  const styleObj = {
    fontSize: 13,
    textAlign: 'center'
  };

  const styleItem = {
    padding: 10
  };

  const styleList = {
    width: '100%',
    height: '380px',
    overflowY: 'scroll'
  };

  const styleItemListHistory = {
    marginLeft: '5%',
    padding: '5px',
    borderRadius: '2px',
    width: '90%'
  };

  const tableStyle = {
    fontSize: '12px',
    width: '100%'
  };

  const itemStyle = {
    border: '1px black solid',
    paddingLeft: '9px !important'
  };

  const styleBoxFormHistorial = {
    padding: '10px'
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, setData, errors, post, processing } = useForm({
    placa: '',
    imei: '',
    telefono: 0,
    conductor: 0,
    grupo: 0,
    status: true,
  });

  const {
    data: data2,
    setData: setData2,
    errors: errors2,
    post: post2,
    processing: processing2
  } = useForm({
    dispositivo: '',
    fecha_inicial: '',
    fecha_final: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('device.store'));
  }

  const [historial, setHistorial] = useState([]);

  let positions = [];
  async function searchInfo(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `history/get/${data2.fecha_inicial}/${data2.fecha_final}/${data2.dispositivo}`
      );

      if (!res.ok) {
        console.log(res);
      }

      const data = await res.json();
      setHistorial([...data.history]);

      let speeds = [];
      data.history.forEach(position => {
        speeds.push({ speed: position.speed, date: position.updated_at });
        positions.push([position.track_lat, position.track_lng]);
      });

      dispatch(setHistory(positions));
      dispatch(setSpeed(speeds));
    } catch (error) {
      console.log(error);
    } finally {
      //setLoading(false);
    }
  }

  return (
    <Tabs>
      <TabList>
        <Tab style={styleObj}>Dispositivos</Tab>
        <Tab style={styleObj}>Eventos</Tab>
        <Tab style={styleObj}>Historial</Tab>
      </TabList>

      {/* Dispositivos */}
      <TabPanel>
        <div className="card-header pb-0 p-3">
          <div className="row">
            <div className="col-12 text-end">
              <Button
                className="btn bg-gradient-dark mb-0"
                variant="primary"
                onClick={handleShow}
              >
                <i className="fas fa-plus"></i>&nbsp;&nbsp;Dispositivo
              </Button>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Dispositivo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <TextInput
                className="mb-3"
                label="Placa"
                name="placa"
                type="text"
                errors={errors.placa}
                value={data.placa}
                onChange={e => setData('placa', e.target.value)}
              />
              <TextInput
                className="mb-3"
                label="Imei"
                name="imei"
                type="text"
                errors={errors.imei}
                value={data.imei}
                onChange={e => setData('imei', e.target.value)}
              />
              <TextInput
                className="mb-3"
                label="Telefono"
                name="telefono"
                type="tel"
                errors={errors.telefono}
                value={data.telefono}
                onChange={e => setData('telefono', e.target.value)}
              />
              <Form.Group
                className="mb-3"
                onChange={e => setData('conductor', e.target.value)}
              >
                <Form.Label htmlFor="disabledSelect">Condutor</Form.Label>
                <Form.Select id="disabledSelect">
                  <option value="0">Seleccionar</option>

                  {drivers.data.map(({ id, nombres, apellidos }, index) => {
                    return (
                      <option key={index} value={id}>
                        {nombres} {apellidos}
                      </option>
                    );
                  })}
                </Form.Select>
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
                  Cerrar
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose}>
                  Registrar Dispositivo
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>

        <Accordion defaultActiveKey={0} flush>
          {groups.data.map(({ id, nombre }, index) => {
            return (
              <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>
                  <strong>{nombre}</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-group">
                    {devices.map(
                      (
                        { placa, fecha, hora, status, connect, grupo },
                        index
                      ) => {
                        return id == grupo && (
                          <li
                            key={index}
                            className="list-group-item border-0 d-flex justify-content-between mb-2 border-radius-lg"
                            style={itemStyle}
                          >
                            <div className="d-flex align-items-center">
                              {connect && (
                                <button className="btn btn-icon-only btn-outline-success mb-0 me-3 d-flex align-items-center justify-content-center">
                                  <i
                                    style={{ fontSize: '20px' }}
                                    className="fas fa-solid fa-wifi"
                                  ></i>
                                </button>
                              )}

                              {!connect && (
                                <button
                                  style={{ fontSize: '15px' }}
                                  className="btn btn-icon-only btn-outline-danger mb-0 me-3 d-flex align-items-center justify-content-center"
                                >
                                  OFF {connect}
                                </button>
                              )}

                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">
                                  {placa}
                                </h6>
                                <span className="text-xs">
                                  {fecha}, {hora}
                                </span>
                              </div>
                            </div>
                            <div className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                style={styleItem}
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </div>
                          </li>
                        )
                      }
                    )}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </TabPanel>

      {/* Eventos */}
      <TabPanel>
        <Table bordered hover style={tableStyle}>
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Evento</th>
              <th>Fecha-Hora</th>
            </tr>
          </thead>
          <tbody>
            {events.map(
              ({ id, event, device, position, positian_name, created_at }) => {
                return (
                  <tr key={id}>
                    <td>{device}</td>
                    <td>{event}</td>
                    <td>{created_at}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </TabPanel>

      {/* Historial */}
      <TabPanel>
        <div style={styleBoxFormHistorial}>
          <form key={2} onSubmit={searchInfo}>
            <fieldset>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Dispositivo</Form.Label>
                  <Form.Select
                    id="disabledSelect"
                    required
                    name="dispositivo"
                    errors={errors2.dispositivo}
                    onChange={e => setData2('dispositivo', e.target.value)}
                  >
                    <option value="">Buscar dispositivo</option>
                    {devices.map(({ id, placa, imei }) => {
                      return (
                        <option key={id} value={imei}>
                          {placa}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-6 col-sm-12">
                  <TextInput
                    className="mb-3"
                    label="Fecha Inicial"
                    name="fecha_inicial"
                    type="date"
                    errors={errors2.fecha_inicial}
                    value={data2.fecha_inicial}
                    onChange={e => setData2('fecha_inicial', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="col-md-6 col-sm-12">
                  <TextInput
                    className="mb-3"
                    label="Fecha Final"
                    name="fecha_final"
                    type="date"
                    errors={errors2.fecha_final}
                    value={data2.fecha_final}
                    onChange={e => setData2('fecha_final', e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-end">
                <Button type="submit">Buscar</Button>
              </div>
            </fieldset>
          </form>
        </div>

        <hr></hr>

        <div style={styleList}>
          <ul className="list-group card">
            {historial.map(
              ({ id, track_lat, track_lng, track_date, track_time, speed }) => {
                return (
                  <li
                    key={id}
                    className="list-group-item"
                    style={styleItemListHistory}
                  >
                    <div className="d-flex align-items-center">
                      <button className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                        <i className="fas fa-clock"></i>
                      </button>
                      <div className="d-flex flex-column">
                        <h6 className="mb-1 text-dark text-sm">
                          {' '}
                          {track_date}, {track_time}
                        </h6>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </TabPanel>
    </Tabs>
  );
};
