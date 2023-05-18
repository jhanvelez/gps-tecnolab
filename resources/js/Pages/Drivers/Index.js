import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { organizations } = usePage().props;
  const {
    data,
    meta: { links }
  } = organizations;
  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <SearchFilter />

            <div className="d-flex flex-row justify-content-between">
              <div>
                <h5 className="mb-0">Conductores</h5>
              </div>

              <InertiaLink
                className="btn bg-gradient-primary btn-sm mb-0"
                href={route('organizations.create')}
              >
                <span>Crear</span>
                <span className="hidden md:inline"> Conductor</span>
              </InertiaLink>
            </div>

            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="font-bold text-left">
                  <th className="px-6 pt-5 pb-4">Nombres</th>
                  <th className="px-6 pt-5 pb-4">Apellidos</th>
                  <th className="px-6 pt-5 pb-4" colSpan="2">
                    Cedula
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ id, name, city, phone, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                        <InertiaLink
                          href={route('organizations.edit', id)}
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
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('organizations.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                        >
                          {city}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('organizations.edit', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                        >
                          {phone}
                        </InertiaLink>
                      </td>
                      <td className="w-px border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('organizations.edit', id)}
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
                {data.length === 0 && (
                  <tr>
                    <td className="px-6 py-4 border-t" colSpan="4">
                      No organizations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination links={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

Index.layout = page => <Layout title="Users" children={page} />;

export default Index;
