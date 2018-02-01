<?php

use Illuminate\Database\Seeder;
use \App\Models\Project;

class ProjectSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $project = new Project();
        $project->name = 'api-report';
        $project->domain = '127.0.0.1';
        $project->intro = '';
        $project->save();
    }
}
