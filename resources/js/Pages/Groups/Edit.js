import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Form from 'react-bootstrap/Form';

const Edit = () => {
  const { user } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    titulo: user.titulo || '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'PUT'
  });

  function handleSubmit(e) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PACH. See comment above.
    post(route('users.update', user.id));
  }

  function destroy() {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      Inertia.delete(route('users.destroy', user.id));
    }
  }

  function restore() {
    if (confirm('¿Está seguro de que desea restaurar este usuario?')) {
      Inertia.put(route('users.restore', user.id));
    }
  }

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="page-header min-height-300 border-radius-xl mt-4">
            <span className="mask bg-gradient-primary opacity-6"></span>
          </div>
          <div className="card card-body blur shadow-blur mx-4 mt-n6">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  {user.photo && (
                    <img
                      className="block w-8 h-8 ml-4 rounded-full"
                      src={user.photo}
                    />
                  )}
                  <a
                    href="#"
                    className="btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2"
                  >
                    <i
                      className="fa fa-pen top-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Image"
                    ></i>
                  </a>
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">
                    {data.first_name} {data.last_name}
                  </h5>
                  <p className="mb-0 font-weight-bold text-sm">
                    {data.owner ? 'Owner' : 'User'}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                <div className="nav-wrapper position-relative end-0">
                  <ul
                    className="nav nav-pills nav-fill p-1 bg-transparent"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link mb-0 px-0 py-1 active "
                        data-bs-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="overview"
                        aria-selected="true"
                      >
                        <span className="ms-1">Overview</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link mb-0 px-0 py-1 "
                        data-bs-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="teams"
                        aria-selected="false"
                      >
                        <span className="ms-1">Teams</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link mb-0 px-0 py-1 "
                        data-bs-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        <span className="ms-1">Projects</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-header pb-0 px-3">
              <h6 className="mb-0">Información de perfil</h6>
            </div>
            <div className="card-body pt-4 p-3">
              <form onSubmit={handleSubmit} method="POST" role="form text-left">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextInput
                        className="w-full  lg:w-1/2"
                        label="Nombres"
                        name="titulo"
                        errors={errors.titulo}
                        value={data.titulo}
                        onChange={e => setData('titulo', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 d-flex justify-content-start">
                    {!user.deleted_at && (
                      <DeleteButton onDelete={destroy}>
                        Eliminar Usuario
                      </DeleteButton>
                    )}
                    {user.deleted_at && (
                      <TrashedMessage onRestore={restore}>
                        Este usuario ha sido eliminado.
                      </TrashedMessage>
                    )}
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <LoadingButton
                      loading={processing}
                      type="submit"
                      className="ml-auto btn-indigo"
                    >
                      Actualizar Usuario
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Helmet title={`${data.first_name} ${data.last_name}`} />
        <div className="flex justify-start max-w-lg mb-8"></div>

        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6"></div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200"></div>
          </form>
        </div>
      </div>
    </>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
