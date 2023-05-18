import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';

import Tabs from '@/Shared/Tabs';

export default ({ ejecutarFuncionHermanoA, stopClick, pauseClick }) => {
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
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
      id="sidenav-main"
    >
      <InertiaLink className="mt-1" href="/">
        <Logo className="text-white fill-current" width="260" height="15" />
      </InertiaLink>

      <div
        className="collapse navbar-collapse  w-auto"
        id="sidenav-collapse-main"
        style={styleMenu}
      >
        <Tabs ejecutarFuncionHermanoA={ejecutarFuncionHermanoA} stopClick={stopClick} pauseClick={pauseClick} className="navbar-nav" />
      </div>
    </aside>
  );
};
