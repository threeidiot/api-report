<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Param
 *
 * @property int $id
 * @property int $api_id 接口 ID
 * @property string $name 参数名称
 * @property string $in 参数位置
 * @property string $type 类型
 * @property int $required 是否必须
 * @property string|null $default 默认值
 * @property string|null $description 描述
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Param onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereApiId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Param whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Param withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Param withoutTrashed()
 * @mixin \Eloquent
 */
class Param extends Model
{
    use SoftDeletes;

    protected $table = 'param';


}
