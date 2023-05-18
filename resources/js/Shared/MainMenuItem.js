import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

export default ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const linkClasses = classNames({
    'nav-link active': isActive,
    'nav-link': !isActive
  });

  const iconClass = `fas fa-${icon} ps-3 pe-3 text-dark`;

  return (
    <div className="nav-item">
      <InertiaLink href={route(link)} className={linkClasses}>
        <div
          style={{
            fontSize: '15px'
          }}
          className="icon icon-shape icon-sm shadow bg-white text-center d-flex align-items-center justify-content-center"
        >
          <i className={iconClass} aria-hidden="true"></i>
        </div>
        <span className="nav-link-text ms-3">{text}</span>
      </InertiaLink>
    </div>
  );
};
