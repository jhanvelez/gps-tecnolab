import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';

const Index = () => {
  const { contacts } = usePage().props;
  const {
    data,
    meta: { links }
  } = contacts;

  const tableStyle = {
    fontSize: '12px'
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4 mx-4">
            <div className="card-header pb-0">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-0">Listado de usuarios</h5>
                </div>

                <InertiaLink
                  className="btn bg-gradient-primary btn-sm mb-0"
                  href={route('contacts.create')}
                >
                  <span>Crear</span>
                  <span className="hidden md:inline"> Usuario</span>
                </InertiaLink>
              </div>
            </div>

            <div className="card-body px-0 pt-0 pb-2">
              <SearchFilter />

              <div className="table-responsive p-0">
                <table
                  className="table align-items-center mb-0"
                  style={tableStyle}
                >
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Nombre
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Organizacion
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Ciudad
                      </th>
                      <th
                        className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                        colSpan="2"
                      >
                        Telefono
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      ({ id, name, city, phone, organization, deleted_at }) => (
                        <tr key={id}>
                          <td className="ps-4">
                            <InertiaLink
                              href={route('contacts.edit', id)}
                              className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                            >
                              {name}
                              {deleted_at && (
                                <Icon
                                  name="trash"
                                  className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                />
                              )}
                            </InertiaLink>
                          </td>
                          <td className="ps-4">
                            <InertiaLink
                              tabIndex="1"
                              className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                              href={route('contacts.edit', id)}
                            >
                              {organization ? organization.name : ''}
                            </InertiaLink>
                          </td>
                          <td className="ps-4">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('contacts.edit', id)}
                              className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                            >
                              {city}
                            </InertiaLink>
                          </td>
                          <td className="ps-4">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('contacts.edit', id)}
                              className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                            >
                              {phone}
                            </InertiaLink>
                          </td>
                          <td className="ps-4">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('contacts.edit', id)}
                              className="flex items-center px-4 focus:outline-none"
                            >
                              <Icon
                                name="cheveron-right"
                                className="block w-6 h-6 text-gray-400 fill-current"
                              />
                            </InertiaLink>
                          </td>
                        </tr>
                      )
                    )}
                    {data.length === 0 && (
                      <tr>
                        <td className="px-6 py-4 border-t" colSpan="4">
                          No contacts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination links={links} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.layout = page => <Layout title="Contacts" children={page} />;

export default Index;
