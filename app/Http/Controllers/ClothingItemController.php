<?php

namespace App\Http\Controllers;

use App\Models\ClothingItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClothingItemController extends Controller
{
    public function index()
    {
        return ClothingItem::where('user_id', auth()->id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'color' => 'nullable|string',
            'size' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = $request->file('image') ? $request->file('image')->store('clothing_images', 'public') : null;

        $item = ClothingItem::create([
            'name' => $request->name,
            'category' => $request->category,
            'color' => $request->color,
            'size' => $request->size,
            'image' => $imagePath,
            'user_id' => auth()->id(),
        ]);

        return response()->json($item, 201);
    }

    public function update(Request $request, ClothingItem $item)
    {
        if ($item->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'string',
            'category' => 'string',
            'color' => 'string',
            'size' => 'string',
            'image' => 'image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::delete('public/' . $item->image);
            }
            $item->image = $request->file('image')->store('clothing_images', 'public');
        }

        $item->update($request->only(['name', 'category', 'color', 'size', 'image']));

        return response()->json($item);
    }

    public function destroy(ClothingItem $item)
    {
        if ($item->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($item->image) {
            Storage::delete('public/' . $item->image);
        }

        $item->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

