<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    protected $fillable = ['amount','machine','orderID','product','time'];

}
