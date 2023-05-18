<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Roles/Index');
    }
}
