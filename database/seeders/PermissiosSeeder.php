<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        $roleAdmin = Role::create(['name' => 'admin']);
        $roleAdmin2 = Role::create(['name' => 'cadete']);
        $roleAdmin3 = Role::create(['name' => 'autoridad']);
        $roleAdmin4 = Role::create(['name' => 'comandante_compania']);
        $roleAdmin5 = Role::create(['name' => 'comandante_section']);
        $roleAdmin6 = Role::create(['name' => 'brigadier_senior']);
        $roleAdmin7 = Role::create(['name' => 'brigadier_disciplinary']);
        $roleAdmin8 = Role::create(['name' => 'comandante_battalion']);

        $permissions = [
            //Permisos de Company
            ['name' => 'organization.index','description' => 'Este permiso permite listar todas las compañías disponibles'],
            ['name' => 'organization.store','description' => 'Este permiso permite registrar una nueva compañía en el sistema'],
            ['name' => 'organization.destroy','description' => 'Este permiso permite cambiar el estado de una compañía en el sistema'],
            ['name' => 'organization.show','description' => 'Este permiso permite ver los detalles de una compañía'],
            ['name' => 'organization.update','description' => 'Este permiso permite actualizar una compañía existente en el sistema'],
            // --- End ---

            //Permisos de Company
            ['name' => 'groups.index','description' => 'Este permiso permite listar todas los grupos disponibles'],
            ['name' => 'groups.store','description' => 'Este permiso permite registrar un nuevo grupo en el sistema'],
            ['name' => 'groups.destroy','description' => 'Este permiso permite cambiar el estado de un grupo en el sistema'],
            ['name' => 'groups.show','description' => 'Este permiso permite ver los detalles de un grupo'],
            ['name' => 'groups.update','description' => 'Este permiso permite actualizar un grupo existente en el sistema'],
            // --- End ---

            //Permisos de Company
            ['name' => 'drivers.index','description' => 'Este permiso permite listar todas los conductores disponibles'],
            ['name' => 'drivers.store','description' => 'Este permiso permite registrar un nuevo conductor en el sistema'],
            ['name' => 'drivers.destroy','description' => 'Este permiso permite cambiar el estado de un conductor en el sistema'],
            ['name' => 'drivers.show','description' => 'Este permiso permite ver los detalles de un conductor'],
            ['name' => 'drivers.update','description' => 'Este permiso permite actualizar un conductor existente en el sistema'],
            // --- End ---

            //Permisos de Company
            ['name' => 'devices.index','description' => 'Este permiso permite listar todas los dispositivos disponibles'],
            ['name' => 'devices.store','description' => 'Este permiso permite registrar un nuevo dispositivo en el sistema'],
            ['name' => 'devices.destroy','description' => 'Este permiso permite cambiar el estado de un dispositivo en el sistema'],
            ['name' => 'devices.show','description' => 'Este permiso permite ver los detalles de un dispositivo'],
            ['name' => 'devices.update','description' => 'Este permiso permite actualizar un dispositivo existente en el sistema'],
            // --- End ---

            //Permisos para modulo permissions
            ['name' => 'permissions.index','description' => 'Este permiso permite listas todas los permisos disponibles'],
            ['name' => 'permissions.show','description' => 'Este permiso permite listar a detalle un permiso'],
            ['name' => 'permissions.remove','description' => 'Este permiso permite remover un permiso de un rol existente'],
            ['name' => 'permissions.assigned','description' => 'Este permiso permite asignar un permiso a un rol existente'],
            ['name' => 'role.permissions','description' => 'Este permiso permite listar todos los permisos de un rol'],
            // --- End ---

            //Permisos para roles
            ['name' => 'roles.index','description' => 'Este permiso permite listas todas los roles disponibles'],
            ['name' => 'roles.show','description' => 'Este permiso permite listar a detalle un rol'],
            ['name' => 'roles.destroy','description' => 'Este permiso permite eliminar un rol existente'],
            ['name' => 'roles.store','description' => 'Este permiso permite crear un rol'],
            ['name' => 'roles.update','description' => 'Este permiso permite actualizar un rol existente'],
            // --- End ---

            //Permisos de usuarios
            ['name' => 'users.index','description' => 'Este permiso permite listas todas los usuarios disponibles'],
            ['name' => 'users.show','description' => 'Este permiso permite listar a detalle un usuario'],
            ['name' => 'users.store','description' => 'Este permiso permite crear una usuario'],
            ['name' => 'users.update','description' => 'Este permiso permite actualizar un usuario'],
            ['name' => 'users.destroy','description' => 'Este permiso permite eliminar un usuario'],
            // --- End ---
        ];

        $roles = [$roleAdmin,$roleAdmin2,$roleAdmin3,$roleAdmin4,$roleAdmin5, $roleAdmin6 , $roleAdmin7, $roleAdmin8];

        foreach ($permissions as $permission) {
            Permission::create($permission)->syncRoles($roles);
        }
    }
}