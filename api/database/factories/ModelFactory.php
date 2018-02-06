<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(\App\Models\Project::class, function (Faker $faker) {
    return [
        'title' => str_random(6),
        'host' => str_random(6),
        'schemes' => str_random(6),
    ];
});

$factory->define(\App\Models\Api::class, function (Faker $faker) {
    return [
        'project_id' => factory(\App\Models\Project::class)->create()->id,
        'summary' => str_random(5),
        'path' => str_random(5),
        'method' => str_random(6),
    ];
});
