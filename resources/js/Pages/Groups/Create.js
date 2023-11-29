import React from 'react';
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';

const Create = () => {
  const { organizations } = usePage().props;

  const { data, setData, errors, post, processing } = useForm({
    nombre: '',
    organization: 0
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('groups.store'));
  }

  return (
    <>
      <div>
        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-header pb-0 px-3">
              <h6 className=" font-bold">
                <InertiaLink
                  href={route('groups')}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Grupos
                </InertiaLink>
                <span className="font-medium text-indigo-600"> /</span> Crear
              </h6>
            </div>
            <div className="card-body pt-4 p-3">
              <form onSubmit={handleSubmit} method="POST" role="form text-left">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextInput
                        className="w-full lg:w-1/2"
                        label="Nombre"
                        name="nombre"
                        type="text"
                        errors={errors.nombre}
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <SelectInput
                      className="pb-4 pr-3"
                      label="Empresa"
                      name="organization"
                      errors={errors.organization}
                      value={data.organization}
                      onChange={e => setData('organization', e.target.value)}
                    >
                      <option>seleccionar empresa</option>
                      {organizations.map((organization, index) => {
                        return (
                          <option key={index} value={organization.id}>
                            {organization.name}
                          </option>
                        );
                      })}
                    </SelectInput>
                  </div>

                  <div className="col-md-12 d-flex justify-content-end">
                    <LoadingButton
                      loading={processing}
                      type="submit"
                      className="btn-indigo"
                    >
                      Crear Grupo
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Create.layout = page => <Layout title="Create User" children={page} />;

export default Create;
