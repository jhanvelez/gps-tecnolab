import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/LayoutManagement';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { driver, organizations } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    documento: driver.documento || '',
    nombres: driver.nombres || '',
    apellidos: driver.apellidos || '',
    organization: driver.organization || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('drivers.update', driver.id));
  }

  function destroy() {
    if (confirm('¿Está seguro de que desea eliminar este conductor?')) {
      Inertia.delete(route('drivers.destroy', driver.id));
    }
  }

  function restore() {
    if (confirm('¿Estás seguro de que quieres restaurar este conductor?')) {
      Inertia.put(route('organizations.restore', driver.id));
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4 mx-4">
          <div className="card-header pb-0">
            <div>
              <Helmet title={data.name} />
              <h5 className="mb-0">
                <InertiaLink
                  href={route('drivers')}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Conductores
                </InertiaLink>
                <span className="mx-2 font-medium text-indigo-600">
                  / Editar
                </span>
                {data.name}
              </h5>
              {driver.deleted_at && (
                <TrashedMessage onRestore={restore}>
                  Este conductor ha sido eliminado.
                </TrashedMessage>
              )}
              <div className="max-w-3xl overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap p-4 -mb-4 -mr-3 row">
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
                          return (
                            <option key={index} value={driver.id}>
                              {driver.name}
                            </option>
                          );
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
                  <div className="px-4 py-2 d-flex justify-content-end">
                    {!driver.deleted_at && (
                      <DeleteButton onDelete={destroy}>
                        Eliminar coductor
                      </DeleteButton>
                    )}
                    <LoadingButton
                      loading={processing}
                      type="submit"
                      className="ml-auto btn-indigo"
                    >
                      Actualizar conductor
                    </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
