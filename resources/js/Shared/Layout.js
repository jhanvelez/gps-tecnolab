import React from 'react';
import Helmet from 'react-helmet';
import Map from '@/Shared/Map';
import FlashMessages from '@/Shared/FlashMessages';
import TopHeader from '@/Shared/TopHeader';
import BottomHeader from '@/Shared/BottomHeader';

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | Trackinglab" title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <TopHeader />
          <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
            <BottomHeader />
            {/*<MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-indigo-800 md:block" />*/}
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="">
              <FlashMessages />
              {children}
              <Map />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
