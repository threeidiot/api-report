<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Project
 *
 * @property int $id
 * @property string $name 名称
 * @property string $domain API 域名
 * @property string|null $intro 介绍
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Project onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereDomain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereIntro($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Project withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Project withoutTrashed()
 * @mixin \Eloquent
 * @property int $project_id 项目 ID
 * @property string $path 路径
 * @property string $method 请求方法
 * @property int $deprecated 不推荐使用
 * @property string $tags 标签
 * @property string $summary 摘要
 * @property string|null $description 描述
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereDeprecated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Api whereTags($value)
 */
class Api extends Model
{
    use SoftDeletes;

    protected $table = 'api';


}
