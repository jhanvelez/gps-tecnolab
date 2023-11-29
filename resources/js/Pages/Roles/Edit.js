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
  const { rol } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: rol.name || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('roles.update', rol.id));
  }

  function destroy() {
    if (confirm('Esta seguro de eliminar este rol?')) {
      Inertia.delete(route('roles.destroy', rol.id));
    }
  }

  function restore() {
    if (confirm('Restarurar este rol?')) {
      Inertia.put(route('roles.restore', rol.id));
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
                  href={route('roles')}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Roles
                </InertiaLink>
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {data.name}
              </h5>
              {rol.deleted_at && (
                <TrashedMessage onRestore={restore}>
                  Este ha sido suprimida.
                </TrashedMessage>
              )}
              <div className="max-w-3xl overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap p-4 -mb-4 -mr-3 row">
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
                  <div className="px-4 py-2 d-flex justify-content-end">
                    {!rol.deleted_at && (
                      <DeleteButton onDelete={destroy}>
                        Eliminar rol
                      </DeleteButton>
                    )}
                    <LoadingButton
                      loading={processing}
                      type="submit"
                      className="ml-auto btn-indigo"
                    >
                      Actualizar rol
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
