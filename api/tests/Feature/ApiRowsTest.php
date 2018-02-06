<?php

namespace Tests\Feature;

use App\Models\Api;
use Tests\TestCase;

class ApiRowsTest extends TestCase
{

    public function testBasicTest()
    {
        $uri = '/api/rows?project_id=1';
        $api = factory(Api::class)->create();
        $res = $this->get($uri);
        $res->assertStatus(200);
        $ret = $this->returnSuccess(['rows' => [$api->toArray()]]);
        $res->assertJson($ret);
    }

    public function testEmpty()
    {
        $uri = '/api/rows?project_id=1';
        $res = $this->get($uri);
        $res->assertStatus(200);
        $ret = $this->returnError('没有找到项目记录');
        $res->assertJson($ret);
    }
}
