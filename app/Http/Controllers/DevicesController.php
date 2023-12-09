<?php

namespace App\Http\Controllers;

use App\Http\Requests\DevicesStoreRequest;
use App\Http\Resources\GroupsCollection;
use App\Http\Resources\GroupsResource;
use App\Models\Device;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;


class DevicesController extends Controller
{
    //Register device
    public function store(DevicesStoreRequest $request)
    {
        Auth::user()->account->devices()->create(
            array_merge(
                $request->validated(),
                ['organization' => Auth::user()->organization]
            )
        );

        return Redirect::route('dashboard')->with('success', 'Equipo registrado.');
    }
}
