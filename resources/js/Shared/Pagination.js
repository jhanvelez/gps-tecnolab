import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Pagination from 'react-bootstrap/Pagination';

const PageLink = ({ active, label, url }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-4 py-3',
      'border border-solid border-gray-300 rounded',
      'text-sm',
      'hover:bg-white',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-white': active
    }
  );
  return (
    <InertiaLink className={className} href={url}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </InertiaLink>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  const className = classNames(
    'mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray'
  );
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: label }} />
  );
};

export default ({ links = [] }) => {
  // dont render, if there's only 1 page (previous, 1, next)
  if (links.length === 3) return null;

  return (
    <>
      <Pagination className="d-flex justify-content-center py-4">
        {links.map(({ active, label, url }) => {
          return url === null ? (
            <Pagination.Item key={label} disabled>
              {label}
            </Pagination.Item>
          ) : (
            <Pagination.Item key={label} active={active} href={url}>
              {label}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
};
