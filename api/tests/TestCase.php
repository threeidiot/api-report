<?php

namespace Tests;

use Artisan;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function setUp()
    {
        parent::setUp();
        Artisan::call('migrate');
    }

    protected function returnSuccess(array $data): array
    {
        return [
            'status' => 'success',
            'result' => $data,
        ];
    }

    protected function returnError(string $msg): array
    {
        return [
            'status' => 'error',
            'message' => $msg,
        ];
    }
}
