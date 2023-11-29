import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { roles } = usePage().props;

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <SearchFilter />

            <div className="d-flex flex-row justify-content-between">
              <div>
                <h5 className="mb-0">Roles</h5>
              </div>

              <InertiaLink
                className="btn bg-gradient-primary btn-sm mb-0"
                href={route('roles.create')}
              >
                <span>Crear</span>
                <span className="hidden md:inline"> Rol</span>
              </InertiaLink>
            </div>

            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="font-bold text-left">
                  <th className="px-6 pt-5 pb-4">Nombre</th>
                  <th className="px-6 pt-5 pb-4">Permisos</th>
                  <th className="px-6 pt-5 pb-4">Editar</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(({ id, name, city, phone, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                          {name}
                          {deleted_at && (
                            <Icon
                              name="trash"
                              className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                            />
                          )}
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          href={route('roles.permissions', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                        >
                          <Icon
                            name="cheveron-right"
                            className="block w-6 h-6 text-gray-400 fill-current"
                          />
                        </InertiaLink>
                      </td>
                      <td className="w-px border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('roles.edit', id)}
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
                })}
                {roles.length === 0 && (
                  <tr>
                    <td className="px-6 py-4 border-t" colSpan="4">
                      No se encontrarón resultados...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* <Pagination links={links} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Index.layout = page => <Layout title="Users" children={page} />;

export default Index;
