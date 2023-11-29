<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationStoreRequest;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Resources\OrganizationCollection;
use App\Http\Resources\OrganizationResource;

use App\Http\Requests\Roles;

use Inertia\Inertia;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesController extends Controller
{
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'filters' => Request::all('search', 'trashed'),
            'roles' => Role::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    public function store(Roles $request)
    {
        $role = Role::create(['name' => $request->name]);

        return Redirect::route('roles')->with('success', 'Rol creado exitosamente.');
    }

    public function edit($rol)
    {
        return Inertia::render('Roles/Edit', [
            'rol' =>  Role::find($rol),
        ]);
    }

    public function update($rol, Roles $request)
    {
        // Find the role by ID
        $role = Role::find($rol);

        // Check if the role exists
        if ($role) {
            // Update the name of the role
            $role->name = $request->name; // Replace 'new_role_name' with the desired new name
            $role->save();

            return Redirect::back()->with('success', 'Rol actualizado');    
        } else {
            // Role not found
            return Redirect::back()->with('error', 'El no se actualizo');
        }
    }

    public function permissions($rol)
    {
        return Inertia::render('Roles/Permissions', [
            'rol' =>  Role::find($rol),
        ]);
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();

        return Redirect::back()->with('success', 'Organization deleted.');
    }

    public function restore(Organization $organization)
    {
        $organization->restore();

        return Redirect::back()->with('success', 'Organization restored.');
    }
}
