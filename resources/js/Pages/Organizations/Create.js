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
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('organizations.store'));
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <h5 className="mb-0">
              <InertiaLink
                href={route('organizations')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Empresas
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

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3 "
                      label="Email"
                      name="email"
                      type="email"
                      errors={errors.email}
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Número de telefono"
                      name="phone"
                      type="text"
                      errors={errors.phone}
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Dirección"
                      name="address"
                      type="text"
                      errors={errors.address}
                      nom
                      value={data.address}
                      onChange={e => setData('address', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Ciudad"
                      name="city"
                      type="text"
                      errors={errors.city}
                      value={data.city}
                      onChange={e => setData('city', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Province/State"
                      name="Region"
                      type="text"
                      errors={errors.region}
                      value={data.region}
                      onChange={e => setData('region', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <SelectInput
                      className="pb-4 pr-3"
                      label="País"
                      name="country"
                      errors={errors.country}
                      value={data.country}
                      onChange={e => setData('country', e.target.value)}
                    >
                      <option value=""></option>
                      <option value="CO">Colombia</option>
                    </SelectInput>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <TextInput
                      className="pb-4 pr-3"
                      label="Codigo postal"
                      name="postal_code"
                      type="text"
                      errors={errors.postal_code}
                      value={data.postal_code}
                      onChange={e => setData('postal_code', e.target.value)}
                    />
                  </div>
                </div>
                <div className="px-2 py-2 d-flex justify-content-end">
                  <LoadingButton
                    loading={processing}
                    type="submit"
                    className="btn btn-success"
                  >
                    Crear empresa
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
