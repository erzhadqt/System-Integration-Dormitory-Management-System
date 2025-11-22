import { useState, useEffect } from "react";
import api from "../api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
  

  // Initialize state only if room is defined
  const [roomType, setRoomType] = useState(room?.room_type || "");
  const [status, setStatus] = useState(room?.status || "");
  const [boarders, setBoarders] = useState(room?.boarders || []);
  const [image, setImage] = useState(room?.image || "");

  const roomTypes = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Bedspacers", label: "Bedspacers" },
  ];

  const statuses = [
    { value: "Available", label: "Available" },
    { value: "Full", label: "Full" },
    { value: "Maintenance", label: "Maintenance" },
  ];

  useEffect(() => {
    if (room) {
      setRoomType(room.room_type || "");
      setStatus(room.status || "");
      setBoarders(room.boarders || []);
      setImage(room.image || "")
    }
  }, [room]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("room_number", room.room_number);
    formData.append("price", room.price);
    formData.append("due_date", room.due_date);
    formData.append("room_type", roomType);
    formData.append("status", status);

    if (image && typeof image === "object") {
      formData.append("image", image);
    }

    try {
      await api.put(`/app/rooms/${room.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };


  if (!room) {
    return null; // Avoid rendering dialog until room is provided
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>Modify the room details and click save.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="grid gap-4">
          <div className="grid gap-2">
            <Label>Room Number</Label>
            <Input name="room_number" defaultValue={room.room_number} required />
          </div>

          <div className="grid gap-2">
            <Label>Price</Label>
            <Input name="price" defaultValue={room.price} required />
          </div>

          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Input name="due_date" type="date" defaultValue={room.due_date} required />
          </div>

          <div className="grid gap-2">
            <Label>Room Type</Label>
            <select
              name="room_type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>Select room type</option>
              {roomTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
              required
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label>Boarders</Label>
            {boarders.length ? (
              <ul className="list-disc pl-5">
                {boarders.map((b) => (
                  <li key={b.id} className="text-sm text-gray-600">
                    {b.first_name} {b.last_name} ({b.email})
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-sm text-gray-400">No boarders assigned</span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full border rounded-md p-2"
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
