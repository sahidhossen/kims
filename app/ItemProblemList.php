<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemProblemList extends Model
{
    protected $table = "item_problem_list";

    protected $fillable = [
        'problems',
        'item_id'
    ];
}
