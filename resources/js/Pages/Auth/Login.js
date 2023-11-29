import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';

import { InertiaLink } from '@inertiajs/inertia-react';


export default () => {
  const { data, setData, errors, post, processing } = useForm({
    email: '',
    password: '',
    remember: true
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('login.attempt'));
  }

  return (
    <div>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">

            <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 my-3 blur blur-rounded shadow py-2 start-0 end-0 mx4">
              <div className="container-fluid {{ (Request::is('static-sign-up') ? 'container' : 'container-fluid') }}">
                <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 {{ (Request::is('static-sign-up') ? 'text-white' : '') }}" href="https://tecnolab.com.co">
                  <strong>From</strong> Tecnolab apps&nbsp;&nbsp;

                  <img className="img-fluid" src="assets/img/favicon.png" alt="Logo" style={{ height: '10%', width: '10%' }} />
                  
                  <div style={{ backgroundImage:  `url("../assets/img/favicon.png")` }}></div>

                </a>
                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">

                      <InertiaLink className="nav-link me-2" href="/500">
                        <i className="fas fa-user-circle opacity-6 me-1 text-dark"></i>
                        Ayuda
                      </InertiaLink>
                    </li>
                    <li className="nav-item">
                      <InertiaLink className="nav-link me-2" href="/400">
                        <i className="fas fa-key opacity-6 me-1 text-dark"></i>
                        Generar ticket
                      </InertiaLink>
                    </li>
                  </ul>
                  <ul className="navbar-nav d-lg-block d-none">
                    <li className="nav-item">
                      <a href="#" target="_blank" className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">
                        Pagos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>

      <Helmet title="Login" />
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Bienvenido</h3>
                      <p className="mb-0">Inicia sesión con sus credenciales</p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <TextInput
                          className="mb-3"
                          label="Correo"
                          name="email"
                          type="email"
                          errors={errors.email}
                          value={data.email}
                          onChange={e => setData('email', e.target.value)}
                        />
                        <TextInput
                          className="mb-3"
                          label="Contraseña"
                          name="password"
                          type="password"
                          errors={errors.password}
                          value={data.password}
                          onChange={e => setData('password', e.target.value)}
                        />
                        <div className="text-center">
                          <LoadingButton
                            type="submit"
                            loading={processing}
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                          >
                            Iniciar Sesión
                          </LoadingButton>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <small className="text-muted">¿Ha olvidado su contraseña? Restablecer
                      <a href="/login/forgot-password" className="text-info text-gradient font-weight-bold"> aquí</a>
                    </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage:  `url("../assets/img/curved-images/curved9.jpeg")` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer py-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mb-4 mx-auto text-center">
                    <a href="https://www.creative-tim.com/?_ga=2.242299972.757293697.1638911086-1528502635.1638911086" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                      Compañia
                    </a>
                    <a href="https://www.creative-tim.com/presentation" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                      Equipo
                    </a>
                    <a href="https://www.creative-tim.com/templates" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                      Productos
                    </a>
                </div>
                <div className="col-lg-8 mx-auto text-center mb-4 mt-2">
                    <a href="https://twitter.com/CreativeTim" target="_blank" className="text-secondary me-xl-4 me-4">
                      <span className="text-lg fab fa-twitter" aria-hidden="true"></span>
                    </a>
                    <a href="https://www.instagram.com/creativetimofficial/" target="_blank" className="text-secondary me-xl-4 me-4">
                      <span className="text-lg fab fa-instagram" aria-hidden="true"></span>
                    </a>
                    <a href="https://github.com/creativetimofficial" target="_blank" className="text-secondary me-xl-4 me-4">
                      <span className="text-lg fab fa-github" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};
