import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('roles.store'));
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <h5 className="mb-0">
              <InertiaLink
                href={route('roles')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Roles
              </InertiaLink>
              <span> /</span> Crear
            </h5>
            <div className="card-body pt-4 p-3 row">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Nombre"
                      name="name"
                      errors={errors.name}
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                    />
                  </div>
                </div>
                <div className="px-2 py-2 d-flex justify-content-end">
                  <LoadingButton
                    loading={processing}
                    type="submit"
                    className="btn btn-success"
                  >
                    Crear rol
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Organization" children={page} />;

export default Create;
