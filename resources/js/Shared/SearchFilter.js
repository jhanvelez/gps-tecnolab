import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { usePrevious } from 'react-use';
import SelectInput from '@/Shared/SelectInput';
import pickBy from 'lodash/pickBy';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default () => {
  const { filters } = usePage().props;
  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    role: filters.role || '', // role is used only on users page
    search: filters.search || '',
    trashed: filters.trashed || ''
  });

  const styleButton = {
    marginBottom: '0px'
  };

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: '',
      search: '',
      trashed: ''
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length
        ? pickBy(values)
        : { remember: 'forget' };
      Inertia.get(route(route().current()), query, {
        replace: true,
        preserveState: true
      });
    }
  }, [values]);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));

    if (opened) setOpened(false);
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-6">
            <div
              onClick={() => setOpened(false)}
              className="fixed inset-0 z-20 bg-black opacity-25"
            ></div>

            <div
              className={`absolute mb-4 mx-4 ${opened ? '' : 'hidden'}`}
              style={{ top: '100%' }}
            >
              {filters.hasOwnProperty('role') && (
                <SelectInput
                  className="mb-4"
                  label="Roles"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                </SelectInput>
              )}
            </div>
          </div>

          <div className="col-6">
            <div
              style={{ top: '100%' }}
              className={`absolute ${opened ? '' : 'hidden'}`}
            >
              <label>Buscar:</label>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Dropdown className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10">
                    <Dropdown.Toggle
                      variant="info"
                      id="dropdown-basic"
                      style={styleButton}
                    >
                      Filtrar
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <SelectInput
                        label="Trashed"
                        name="trashed"
                        value={values.trashed}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        {/*<option value="with"></option>*/}
                        <option value="only">Solo usuarios eliminados</option>
                      </SelectInput>
                    </Dropdown.Menu>
                  </Dropdown>
                </InputGroup.Text>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  name="search"
                  value={values.search}
                  onChange={handleChange}
                  placeholder="Buscar…"
                />
                <InputGroup.Text>
                  <Button
                    variant="link"
                    onClick={reset}
                    type="button"
                    style={styleButton}
                  >
                    Limpiar
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
