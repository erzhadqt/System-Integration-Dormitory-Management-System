import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../api";

export default function AddRoomDialog({ onSaved, children }) {
  const [open, setOpen] = useState(false);

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [dueDate, setDueDate] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [boarders, setBoarders] = useState([]); // All boarders
  const [selectedBoarders, setSelectedBoarders] = useState([]); // Selected

  // Fetch boarders when dialog opens
  useEffect(() => {
    if (open) {
      api
        .get("/app/boarders/")
        .then((res) => setBoarders(res.data))
        .catch((err) => console.error("Failed to fetch boarders:", err));
    }
  }, [open]);

  const resetForm = () => {
    setRoomNumber("");
    setRoomType("");
    setPrice("");
    setStatus("Available");
    setDueDate("");
    setImage(null);
    setSelectedBoarders([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("room_number", roomNumber);
      formData.append("room_type", roomType);
      formData.append("price", price);
      formData.append("status", status);
      formData.append("due_date", dueDate);

      if (image) {
        formData.append("image", image);
      }

      // Create room (multipart/form-data)
      const response = await api.post("/app/rooms/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const roomId = response.data.id;

      // Assign selected boarders
      if (selectedBoarders.length > 0) {
        await Promise.all(
          selectedBoarders.map((boarderId) =>
            api.patch(`/app/boarders/${boarderId}/`, { room: roomId })
          )
        );
      }

      setLoading(false);
      setOpen(false);
      resetForm();
      onSaved();
    } catch (err) {
      console.error("Failed to add room:", err);
      alert("Failed to add room. Please try again.");
      setLoading(false);
    }
  };

  const toggleBoarderSelection = (id) => {
    if (selectedBoarders.includes(id)) {
      setSelectedBoarders(selectedBoarders.filter((b) => b !== id));
    } else {
      setSelectedBoarders([...selectedBoarders, id]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>Fill in the room details and click save.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Room Number */}
          <div className="grid gap-2">
            <Label>Room Number</Label>
            <Input
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Room Type */}
          <div className="grid gap-2">
            <Label>Room Type</Label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="px-3 py-2 border rounded-md"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Bedspacers">Bedspacers</option>
            </select>
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
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

          {/* Assign Boarders */}
          <div className="grid gap-2">
            <Label>Assign Boarders</Label>
            {boarders.length > 0 ? (
              <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                {boarders.map((b) => (
                  <div key={b.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBoarders.includes(b.id)}
                      onChange={() => toggleBoarderSelection(b.id)}
                    />
                    <span className="text-sm text-gray-600">
                      {b.first_name} {b.last_name} ({b.email})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-400">No boarders available</span>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
