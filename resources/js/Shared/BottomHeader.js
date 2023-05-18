import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Shared/Icon';

export default () => {
  const { auth } = usePage().props;
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div className="container-fluid py-1 px-3">
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 d-flex justify-content-end" id="navbar">
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a  href={route('logout')} className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Cerrar sesión</span>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="/organizations" className="nav-link text-body p-0">
                <i className="fa fa-cogs fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="#" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">

                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
