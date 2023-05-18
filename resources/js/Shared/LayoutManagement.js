import React from 'react';
import Helmet from 'react-helmet';
import MainMenu from '@/Shared/MainMenu';
import FlashMessages from '@/Shared/FlashMessages';
import TopHeaderManagement from '@/Shared/TopHeaderManagement';
import BottomHeader from '@/Shared/BottomHeader';

export default function Layout({ title, children }) {
  const styleMain = {
    paddingLeft: '0',
    width: '80%',
    position: 'relative',
    float: 'right'
  };

  const styleContent = {
    paddingTop: '0'
  };

  return (
    <div>
      <Helmet titleTemplate="%s | Trackinglab" title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <TopHeaderManagement />
          <BottomHeader />

          <main
            className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg"
            style={styleMain}
          >
            <div className="container-fluid" style={styleContent}>
              <FlashMessages />
              <div className="container-fluid">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
