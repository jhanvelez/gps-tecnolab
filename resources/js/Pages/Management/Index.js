import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import SearchFilter from '@/Shared/SearchFilter';
import Layout from '@/Shared/LayoutManagement';
import Pagination from '@/Shared/Pagination';

const Dashboard = () => {
  const { users } = usePage().props;
  const {
    data,
    meta: { links }
  } = users;

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4 mx-4">
            <div className="card-header pb-0">
              <SearchFilter />

              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-0">Listado de usuarios</h5>
                </div>
                <a
                  href="#"
                  className="btn bg-gradient-primary btn-sm mb-0"
                  type="button"
                >
                  +&nbsp; New User
                </a>
              </div>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        ID
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Photo
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Name
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Email
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        role
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Creation Date
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-4">
                        <p className="text-xs font-weight-bold mb-0">1</p>
                      </td>
                      <td>
                        <div></div>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Admin</p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          admin@softui.com
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Admin</p>
                      </td>
                      <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          16/06/18
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          className="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit user"
                        >
                          <i className="fas fa-user-edit text-secondary"></i>
                        </a>
                        <span>
                          <i className="cursor-pointer fas fa-trash text-secondary"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-4">
                        <p className="text-xs font-weight-bold mb-0">2</p>
                      </td>
                      <td>
                        <div></div>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Creator</p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          creator@softui.com
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Creator</p>
                      </td>
                      <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          05/05/20
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          className="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit user"
                        >
                          <i className="fas fa-user-edit text-secondary"></i>
                        </a>
                        <span>
                          <i className="cursor-pointer fas fa-trash text-secondary"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-4">
                        <p className="text-xs font-weight-bold mb-0">3</p>
                      </td>
                      <td>
                        <div></div>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Member</p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          member@softui.com
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Member</p>
                      </td>
                      <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          23/06/20
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          className="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit user"
                        >
                          <i className="fas fa-user-edit text-secondary"></i>
                        </a>
                        <span>
                          <i className="cursor-pointer fas fa-trash text-secondary"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-4">
                        <p className="text-xs font-weight-bold mb-0">4</p>
                      </td>
                      <td>
                        <div></div>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          Peterson
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          peterson@softui.com
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Member</p>
                      </td>
                      <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          26/10/17
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          className="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit user"
                        >
                          <i className="fas fa-user-edit text-secondary"></i>
                        </a>
                        <span>
                          <i className="cursor-pointer fas fa-trash text-secondary"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-4">
                        <p className="text-xs font-weight-bold mb-0">5</p>
                      </td>
                      <td>
                        <div></div>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Marie</p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">
                          marie@softui.com
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Creator</p>
                      </td>
                      <td className="text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          23/01/21
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          className="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit user"
                        >
                          <i className="fas fa-user-edit text-secondary"></i>
                        </a>
                        <span>
                          <i className="cursor-pointer fas fa-trash text-secondary"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination links={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Persistent layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
