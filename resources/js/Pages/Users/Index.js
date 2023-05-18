import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { users } = usePage().props;
  const {
    data,
    meta: { links }
  } = users;

  const tableStyle = {
    fontSize: '12px'
  };

  return (
    <>
      {/*
                    <tbody>
                      {data.map(
                        ({ id, name, photo, email, owner, deleted_at }) => {
                          return (
                            <tr
                              key={id}
                              className="hover:bg-gray-100 focus-within:bg-gray-100"
                            >
                              <td className="border-t">
                                <InertiaLink
                                  href={route('users.edit', id)}
                                  className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                >
                                  {photo && (
                                    <img
                                      src={photo}
                                      className="block w-5 h-5 mr-2 -my-2 rounded-full"
                                    />
                                  )}
                                  {name}
                                 
                                </InertiaLink>
                              </td>
                              <td className="border-t">
                                <InertiaLink
                                  tabIndex="-1"
                                  href={route('users.edit', id)}
                                  className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                >
                                  {email}
                                </InertiaLink>
                              </td>
                              <td className="border-t">
                                <InertiaLink
                                  tabIndex="-1"
                                  href={route('users.edit', id)}
                                  className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                >
                                  {owner ? 'Owner' : 'User'}
                                </InertiaLink>
                              </td>
                              <td className="w-px border-t">
                                <InertiaLink
                                  tabIndex="-1"
                                  href={route('users.edit', id)}
                                  className="flex items-center px-4 focus:outline-none"
                                >
                                  <Icon
                                    name="cheveron-right"
                                    className="block w-6 h-6 text-gray-400 fill-current"
                                  />
                                </InertiaLink>
                              </td>
                            </tr>
                          );
                        }
                      )}

                      {data.length === 0 && (
                        <tr>
                          <td className="px-6 py-4 border-t" colSpan="4">
                            No contacts found.
                          </td>
                        </tr>
                      )}
      */}

      <div>
        <div className="row">
          <div className="col-12">
            <div className="card mb-4 mx-4">
              <div className="card-header pb-0">
                <SearchFilter />

                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-0">Usuarios</h5>
                  </div>

                  <InertiaLink
                    className="btn bg-gradient-primary btn-sm mb-0"
                    href={route('users.create')}
                  >
                    <span>Nuevo</span>
                    <span className="hidden md:inline"> Usuario</span>
                  </InertiaLink>
                </div>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          #
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Foto
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Nombre
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Correo
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Rol
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Fecha de creación
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user, index) => {
                        return (
                          <tr key={user.id}>
                            <td className="ps-4">
                              <p className="text-xs font-weight-bold mb-0">
                                {index}
                              </p>
                            </td>
                            <td>
                              <div>
                                {user.photo && (
                                  <img
                                    src={user.photo}
                                    className="block w-5 h-5 mr-2 -my-2 rounded-full"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="text-center">
                              <p className="text-xs font-weight-bold mb-0">
                                {user.name}
                                {user.deleted_at && (
                                  <Icon
                                    name="trash"
                                    className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                  />
                                )}
                              </p>
                            </td>
                            <td className="text-center">
                              <p className="text-xs font-weight-bold mb-0">
                                {user.email}
                              </p>
                            </td>
                            <td className="text-center">
                              <p className="text-xs font-weight-bold mb-0">
                                {user.owner}
                              </p>
                            </td>
                            <td className="text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                16/06/18
                              </span>
                            </td>
                            <td className="text-center">
                              <InertiaLink
                                tabIndex="-1"
                                href={route('users.edit', user.id)}
                                className="flex items-center px-4 focus:outline-none"
                              >
                                <i className="fas fa-user-edit text-secondary"></i>
                              </InertiaLink>
                              <span>
                                <i className="cursor-pointer fas fa-trash text-secondary"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination links={links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = page => <Layout title="Users" children={page} />;

export default Index;
