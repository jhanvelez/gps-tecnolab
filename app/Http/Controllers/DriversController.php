<?php

namespace App\Http\Controllers;

use App\Http\Requests\DriverStoreRequest;
use App\Http\Requests\DriverUpdateRequest;
use App\Http\Resources\DriverCollection;
use App\Http\Resources\DriverResource;
use Inertia\Inertia;
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
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Drivers/Create');
    }

    public function store(OrganizationStoreRequest $request)
    {
        Auth::user()->account->organizations()->create(
            $request->validated()
        );

        return Redirect::route('organizations')->with('success', 'Organization created.');
    }

    public function edit(Organization $organization)
    {
        return Inertia::render('Organizations/Edit', [
            'organization' => new OrganizationResource($organization),
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
