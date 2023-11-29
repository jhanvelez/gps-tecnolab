import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { groups } = usePage().props;
  const {
    data,
    meta: { links }
  } = groups;

  console.log( groups );

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4 mx-4">
            <div className="card-header pb-0">
              <SearchFilter />

              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-0">Grupos</h5>
                </div>

                <InertiaLink
                  className="btn bg-gradient-primary btn-sm mb-0"
                  href={route('groups.create')}
                >
                  <span>Nuevo</span>
                  <span className="hidden md:inline"> grupo</span>
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
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Nombre
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Empresa
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((group, index) => {
                      return (
                        <tr key={group.id}>
                          <td className="ps-4">
                            <p className="text-xs font-weight-bold mb-0">
                              {index + 1}
                            </p>
                          </td>
                          <td className="text-center">
                            <p className="text-xs font-weight-bold mb-0">
                              {group.nombre}
                              {group.deleted_at && (
                                <Icon
                                  name="trash"
                                  className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                />
                              )}
                            </p>
                          </td>
                          <td className="text-center">
                            <p className="text-xs font-weight-bold mb-0">
                              {group.organization}
                            </p>
                          </td>
                          <td className="text-center">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('groups.edit', group.id)}
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
                          No se han encontrado grupos.
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

Index.layout = page => <Layout title="Users" children={page} />;

export default Index;
