<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Costreq extends Model
{
    protected $fillable = ['amount','orderID','product','time'];
}
