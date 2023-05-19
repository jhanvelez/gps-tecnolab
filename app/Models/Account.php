<?php

namespace App\Models;

class Account extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function organizations()
    {
        return $this->hasMany(Organization::class);
    }

    public function drivers()
    {
        return $this->hasMany(Driver::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function groups()
    {
        return $this->hasMany(Grupos::class);
    }
}
