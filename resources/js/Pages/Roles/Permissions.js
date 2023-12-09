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
  const { rol, permissions } = usePage().props;
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

  const assignedPermissions = (e, permission) => {
    console.log(e, permission);
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
                {data.name} / Permisos
              </h5>
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="font-bold text-left">
                    <th className="px-6 pt-5 pb-4">Permiso</th>
                    <th className="px-6 pt-5 pb-4">Asignar/Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(({ id, assigned, description, deleted_at }) => {
                    return (
                      <tr
                        key={id}
                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                      >
                        <td className="border-t">
                            {description}
                            {deleted_at && (
                              <Icon
                                name="trash"
                                className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                              />
                            )}
                        </td>
                        <td className="border-t">
                          <input
                            type='checkbox'
                            className='form-checkbox h-5 w-5 text-gray-600'
                            checked={assigned}
                            onChange={e => assignedPermissions(assigned, id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
