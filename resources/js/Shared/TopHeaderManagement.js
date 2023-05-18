import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import MainMenu from '@/Shared/MainMenu';

export default () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const styleMenu = {
    overflow: 'hidden',
    height: '85%'
  };

  const styleAside = {
    overflow: 'hidden',
    background: 'white'
  };

  return (
    <aside
      style={styleAside}
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 col-md-3"
      id="sidenav-main"
    >
      <InertiaLink className="mt-1" href="/">
        <Logo className="text-white fill-current" width="260" height="15" />
      </InertiaLink>

      <div className="relative md:hidden">
        {/*
        <svg
          onClick={() => setMenuOpened(true)}
          className="w-6 h-6 text-white cursor-pointer fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        */}
        <div className={`${menuOpened ? '' : 'hidden'} absolute right-0 z-20`}>
          <div
            className="collapse navbar-collapse  w-auto"
            id="sidenav-collapse-main"
          >
            <MainMenu className="navbar-nav" />
          </div>
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </aside>
  );
};
