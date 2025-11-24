import { useState, useEffect } from "react";
import api from "../api"; 
import { Button } from "@/components/ui/button"; // Adjust path if needed
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditRoomDialog({ room, onClose, onSaved }) {
  const [loading, setLoading] = useState(false);

  // 1. STATE VARIABLES to hold the new values
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);

  // 2. USE EFFECT: When the dialog opens, fill the state with existing room data
  useEffect(() => {
    if (room) {
      setRoomNumber(room.room_number || "");
      setPrice(room.price || "");
      setRoomType(room.room_type || "Single");
      setDueDate(room.due_date || "");
      setStatus(room.status || "Available");
      setImage(null); // Reset image on new open
    }
  }, [room]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    // 3. APPEND STATE VALUES (What the user typed), not the original 'room' props
    formData.append("room_number", roomNumber);
    formData.append("price", price);
    formData.append("room_type", roomType);
    formData.append("due_date", dueDate);
    formData.append("status", status);

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.put(`/app/rooms/${room.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 4. Success! Refresh parent and close.
      onSaved(); 
      onClose(); 
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>Make changes to the room here.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="grid gap-4">
          
          <div className="grid gap-2">
            <Label>Room Number</Label>
            <Input 
                value={roomNumber} 
                onChange={(e) => setRoomNumber(e.target.value)} 
                required 
            />
          </div>

          <div className="grid gap-2">
            <Label>Price</Label>
            <Input 
                type="number"
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
            />
          </div>

          <div className="grid gap-2">
            <Label>Room Type</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Bedspacers">Bedspacers</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                required 
            />
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Full">Full</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Upload Image */}
          <div className="grid gap-2">
            <Label>Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 rounded-md"
            />
         </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}