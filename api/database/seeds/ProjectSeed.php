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
        $project->title = 'api-report';
        $project->host = '127.0.0.1:7500';
        $project->schemes = 'http';
        $project->save();
    }
}
