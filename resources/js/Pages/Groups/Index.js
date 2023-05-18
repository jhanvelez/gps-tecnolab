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

  const tableStyle = {
    fontSize: '12px'
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card mb-4 mx-4">
              <div className="card-header pb-0">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-0">Grupos</h5>
                  </div>

                  <InertiaLink
                    className="btn bg-gradient-primary btn-sm mb-0"
                    href={route('groups.create')}
                  >
                    <span>Crear</span>
                    <span className="hidden md:inline"> Grupo</span>
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
                        <th
                          className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                          colSpan="2"
                        >
                          Titulo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(({ id, nombre }) => {
                        return (
                        <tr
                          key={id}
                          className="hover:bg-gray-100 focus-within:bg-gray-100"
                        >
                          <td className="border-t">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('groups.edit', id)}
                              className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                            >
                              {nombre}
                            </InertiaLink>
                          </td>
                          <td className="w-px border-t">
                            <InertiaLink
                              tabIndex="-1"
                              href={route('groups.edit', id)}
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
    </>
  );
};

Index.layout = page => <Layout title="Users" children={page} />;

export default Index;
