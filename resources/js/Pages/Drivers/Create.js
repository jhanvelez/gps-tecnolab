import React from 'react';
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { organizations } = usePage().props;

  const { data, setData, errors, post, processing } = useForm({
    documento: '',
    nombres: '',
    apellidos: '',
    organization: 0
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('drivers.store'));
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <h5 className="mb-0">
              <InertiaLink
                href={route('drivers')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Conductores
              </InertiaLink>
              <span> /</span> crear
            </h5>
            <div className="card-body pt-4 p-3 row">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3 "
                      label="Documento"
                      name="documento"
                      type="number"
                      errors={errors.documento}
                      value={data.documento}
                      onChange={e => setData('documento', e.target.value)}
                    />
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
                      {organizations.map((driver, index) => {
                        return (<option key={index} value={driver.id}>{driver.name}</option>)
                      })}
                    </SelectInput>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Nombres"
                      name="nombres"
                      type="text"
                      errors={errors.nombres}
                      value={data.nombres}
                      onChange={e => setData('nombres', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3 "
                      label="Apellidos"
                      name="apellidos"
                      type="text"
                      errors={errors.apellidos}
                      value={data.apellidos}
                      onChange={e => setData('apellidos', e.target.value)}
                    />
                  </div>
                </div>
                <div className="px-2 py-2 d-flex justify-content-end">
                  <LoadingButton
                    loading={processing}
                    type="submit"
                    className="btn btn-success"
                  >
                    Crear conductor
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
