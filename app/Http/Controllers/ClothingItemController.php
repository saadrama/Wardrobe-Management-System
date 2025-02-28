<?php

namespace App\Http\Controllers;

use App\Models\ClothingItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class ClothingItemController extends Controller
{
    // Get all clothing items for the authenticated user
    public function index()
    {
        return ClothingItem::where('user_id', Auth::id())->get();
    }

    // Create a new clothing item
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
            'user_id' => Auth::id(), // Use Auth::id()
        ]);

        return response()->json($item, Response::HTTP_CREATED);
    }

    // Update a clothing item
    public function update(Request $request, $id) // Change to accept ID
    {
        $item = ClothingItem::findOrFail($id); // Ensure item exists

        if ($item->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'name' => 'string',
            'category' => 'string',
            'color' => 'string',
            'size' => 'string',
            'image' => 'image|max:2048',
        ]);

        // Delete old image if a new one is uploaded
        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::delete('public/' . $item->image);
            }
            $item->image = $request->file('image')->store('clothing_images', 'public');
        }

        // Update item
        $item->update($request->only(['name', 'category', 'color', 'size', 'image']));

        return response()->json($item);
    }

    // Delete a clothing item
    public function destroy($id) // Changed to accept ID
    {
        $item = ClothingItem::findOrFail($id); 

        if ($item->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        if ($item->image) {
            Storage::delete('public/' . $item->image);
        }

        $item->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
