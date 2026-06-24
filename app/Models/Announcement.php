<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table = 'announcements';

    protected $primaryKey = 'announcement_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'announcement_id',
        'title',
        'summary',
        'description',
        'starts_at',
        'ends_at',
        'venue',
        'organizer',
        'audience',
        'status',
        'capacity',
        'registration_link',
        'contact_name',
        'contact_email',
        'is_featured',
        'published_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}
