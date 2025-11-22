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
    first_name: "",
    last_name: "",
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
        name: `${boarder.first_name || ""} ${boarder.last_name || ""}`,
        gender: boarder.gender || "",
        email: boarder.email || "",
        address: boarder.address || "",
        room: boarder.room || "",
        contact_number: boarder.contact_number || "",
        guardian_name: boarder.guardian_name || "",
        guardian_contact: boarder.guardian_contact || "",
        // guardian_email: boarder.guardian_email || "",
      });

      // fetch room list
      api.get("/app/rooms/").then((res) => setRooms(res.data));
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
      await api.patch(`/app/boarders/${boarder.id}/`, {
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" "),
        gender: formData.gender,
        email: formData.email,
        address: formData.address,
        room: formData.room,
        contact_number: formData.contact,
        guardian_name: formData.guardian_name,
        guardian_contact: formData.guardian_contact,
        // guardian_email: formData.guardian_email,
      });

      setLoading(false);
      setOpen(false);
      onSaved(); // refresh parent table
    } catch (err) {
      console.error("Failed to update boarder:", err);
      setLoading(false);
      alert("Failed to update tenant.");
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
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                className="border rounded-md p-2"
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
