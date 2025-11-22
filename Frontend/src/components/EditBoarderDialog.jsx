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
import { GenderRadioBtn } from "./GenderRadioBtn";

export default function EditBoarderDialog({ boarder, onSaved, children }) {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    email: "",
    address: "",
    room: "",
    contact_number: "",
    guardian_name: "",
    guardian_contact: "",
  });

  const [loading, setLoading] = useState(false);

  // Load boarder info into form on open
  useEffect(() => {
    if (open && boarder) {
      setFormData({
        username: boarder.username || "",
        gender: boarder.gender || "Male",
        email: boarder.email || "",
        address: boarder.address || "",
        // Handle case where room might be an object (from serializer) or just an ID
        room: boarder.room?.id || boarder.room || "", 
        contact_number: boarder.contact_number || "",
        guardian_name: boarder.guardian_name || "",
        guardian_contact: boarder.guardian_contact || "",
      });

      // Fetch room list for the dropdown
      api.get("/app/rooms/")
        .then((res) => setRooms(res.data))
        .catch((err) => console.error("Failed to fetch rooms", err));
    }
  }, [open, boarder]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Split name back into first and last
      // const nameParts = formData.name.trim().split(" ");
      // const firstName = nameParts[0];
      // const lastName = nameParts.slice(1).join(" ") || "Unknown"; // Fallback if no last name

      await api.patch(`/app/boarders/${boarder.id}/`, {
        username: formData.username,
        gender: formData.gender,
        email: formData.email,
        address: formData.address,
        room: formData.room, // This sends the ID
        contact_number: formData.contact_number, // Fixed: matches state name
        guardian_name: formData.guardian_name,
        guardian_contact: formData.guardian_contact,
      });

      setLoading(false);
      setOpen(false);
      
      // This triggers the parent's refresh AND the SuccessAlert
      if (onSaved) onSaved(); 

    } catch (err) {
      console.error("Failed to update boarder:", err);
      setLoading(false);
      alert("Failed to update tenant. Please check inputs.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tenant</DialogTitle>
          <DialogDescription>Modify the tenant’s information below.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Name */}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. Juan Dela Cruz"
                required
              />
            </div>

            {/* Gender */}
            <div className="grid gap-2">
              <Label>Gender</Label>
              <GenderRadioBtn
                value={formData.gender}
                onChange={(val) => setFormData({ ...formData, gender: val })}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Room */}
            <div className="grid gap-2">
              <Label>Room</Label>
              <select
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.room_number} ({room.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Contact */}
            <div className="grid gap-2">
              <Label>Contact Number</Label>
              <Input
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Guardian Name */}
            <div className="grid gap-2">
              <Label>Guardian Name</Label>
              <Input
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Guardian Contact */}
            <div className="grid gap-2">
              <Label>Guardian Contact</Label>
              <Input
                name="guardian_contact"
                value={formData.guardian_contact}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}