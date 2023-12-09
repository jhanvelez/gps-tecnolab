<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Roles;
use App\Models\Organization;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'filters' => Request::all('search', 'role', 'trashed'),
            'users' => new UserCollection(
                Auth::user()->account->users()
                    ->when(Auth::user(), function ($query) {
                        $query->whereHas('organization', function ($query) {
                            $query->where('id', Auth::user()->organization);
                        });
                    })
                    ->orderByName()
                    ->filter(Request::only('search', 'role', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
            'roles' => Roles::get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'organizations' => Organization::select('name', 'id')->orderBy('name')->get()
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        Auth::user()->account->users()->create(
            $request->validated()
        );

        return Redirect::route('users')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'organizations' => Organization::select('name', 'id')->orderBy('name')->get()
        ]);
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Usuario actualizado.');
    }

    public function destroy(User $user, UserDeleteRequest $request)
    {
        $user->delete();

        return Redirect::back()->with('success', 'User deleted.');
    }

    public function restore(User $user)
    {
        $user->restore();

        return Redirect::back()->with('success', 'User restored.');
    }
}
