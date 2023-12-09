<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\GrupoStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\GroupsCollection;
use App\Http\Resources\GroupsResource;
use App\Models\Organization;
use App\Models\Grupos;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class GroupsController extends Controller
{
    public function index()
    {
        return Inertia::render('Groups/Index', [
            'filters' => Request::all('search', 'trashed'),
            'groups' =>new GroupsCollection(
                Auth::user()->account->groups()
                    ->when(Auth::user(), function ($query) {
                        $query->whereHas('organization', function ($query) {
                            $query->where('id', Auth::user()->organization);
                        });
                    })
                    ->with('organization')
                    ->orderBy('id')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Groups/Create',[
            'organizations' => Organization::select('name', 'id')->orderBy('name')->get()
        ]);
    }

    public function store(GrupoStoreRequest $request)
    {
        Auth::user()->account->groups()->create(
            $request->validated()
        );

        return Redirect::route('groups')->with('success', 'Grupo creado.');
    }

    public function edit(Grupos $user)
    {
        return Inertia::render('groups/Edit', [
            'user' => new GroupsResource($user),
        ]);
    }

    public function update(Grupos $user, UserUpdateRequest $request)
    {
        $user->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Grupo actualizado.');
    }

    public function destroy(Grupos $user, UserDeleteRequest $request)
    {
        $user->delete();

        return Redirect::back()->with('success', 'Grupo eliminado.');
    }

    public function restore(Grupos $user)
    {
        $user->restore();

        return Redirect::back()->with('success', 'Grupo restaurado.');
    }
}
