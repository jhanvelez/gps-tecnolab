<?php

namespace App\Http\Controllers;

use App\Http\Requests\DriverStoreRequest;
use App\Http\Requests\DriverUpdateRequest;
use App\Http\Resources\DriverCollection;
use App\Http\Resources\DriverResource;
use Inertia\Inertia;
use App\Models\Driver;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class DriversController extends Controller
{
    public function index()
    {
        return Inertia::render('Drivers/Index', [
            'filters' => Request::all('search', 'trashed'),
            'drivers' => new DriverCollection(
                Auth::user()->account->drivers()
                    ->orderBy('nombres')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Drivers/Create',[
            'organizations' => Organization::select('name', 'id')->orderBy('name')->get()
        ]);
    }

    public function store(DriverStoreRequest $request)
    {
        Auth::user()->account->drivers()->create(
            $request->validated()
        );

        return Redirect::route('drivers')->with('success', 'Conductor creado.');
    }

    public function edit(Driver $driver)
    {
        return Inertia::render('Drivers/Edit', [
            'driver' => new DriverResource($driver),
            'organizations' => Organization::select('name', 'id')->orderBy('name')->get()
        ]);
    }

    public function update(Organization $organization, OrganizationUpdateRequest $request)
    {
        $organization->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Organization updated.');
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
