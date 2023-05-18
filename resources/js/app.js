import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import * as Sentry from '@sentry/browser';

import '../scss/app.scss';  // Import all of Bootstrap's JS
import '../../public/assets/css/soft-ui-dashboard.css?v=1.0.3';
import '../../public/assets/css/nucleo-svg.css';
import '../../public/assets/css/nucleo-icons.css';

import * as bootstrap from 'bootstrap';

import { Provider } from 'react-redux';

import store from '@/app/store';

InertiaProgress.init({
  color: '#ED8936',
  showSpinner: true
});

Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <InertiaApp
      initialPage={JSON.parse(app.dataset.page)}
      resolveComponent={name =>
        import(`./Pages/${name}`).then(module => module.default)
      }
    />
  </Provider>,
  app
);
