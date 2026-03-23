<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\SystemLog;

class UserController extends Controller
{
    public function customer()
    {
        $search = trim((string) request()->query('q', ''));
        $query = User::where('role', 'CUSTOMER')
            ->select('id', 'name', 'email', 'created_at', 'updated_at');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->orWhere('id', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('admin/users', [
            'users' => $query->paginate(20)->withQueryString(),
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    public function driver()
    {
        $search = trim((string) request()->query('q', ''));
        $query = User::where('role', 'DRIVER')
            ->select('id', 'name', 'email', 'created_at', 'updated_at');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->orWhere('id', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('admin/users', [
            'users' => $query->paginate(20)->withQueryString(),
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    public function admin()
    {
        $search = trim((string) request()->query('q', ''));
        $query = User::where('role', 'ADMINISTRATOR')
            ->select('id', 'name', 'email', 'created_at', 'updated_at');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->orWhere('id', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('admin/users', [
            'users' => $query->paginate(20)->withQueryString(),
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string', Rule::in(['ADMINISTRATOR', 'DRIVER', 'CUSTOMER'])],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        SystemLog::create([
            'datelog' => now()->toDateString(),
            'timelog' => now()->format('H:i:s'),
            'action' => 'ADD',
            'module' => 'USERS',
            'performed_to' => (string) $user->id,
            'description' => 'User record for '.$user->name.' was created.',
        ]);

        return back()->with([
            'modal_status' => "success",
            'modal_action' => "create",
            'modal_title' => "User created!",
            'modal_message' => "User #" . $user->id . " was created successfully.",
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'string',
            'role' => ['required', 'string', Rule::in(['ADMINISTRATOR', 'DRIVER', 'CUSTOMER'])],
        ]);


        $user->update($validated);

        SystemLog::create([
            'datelog' => now()->toDateString(),
            'timelog' => now()->format('H:i:s'),
            'action' => 'UPDATE',
            'module' => 'USERS',
            'performed_to' => (string) $user->id,
            'description' => 'User information was updated.',
        ]);

        return back()->with([
            'modal_status' => "success",
            'modal_action' => "update",
            'modal_title' => "User updated!",
            'modal_message' => "User #" . $user->id . " was updated successfully.",
        ]);
    }

    public function destroy(User $user) {
        $user->delete();

        return back()->with([
            'modal_status' => "success",
            'modal_action' => "delete",
            'modal_title' => "User deleted!",
            'modal_message' => "User #" . $user->id . " was deleted successfully.",
        ]);
    }   
}
