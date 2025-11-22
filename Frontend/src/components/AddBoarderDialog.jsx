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

export default function AddBoarderDialog({ onSaved, children }) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
      username: "",
      password: "",
      gender: "",
      email: "",
      address: "",
      room: "",
      contact_number: "",
      guardian_name: "",
      guardian_contact: "",
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch rooms
  useEffect(() => {
    if (open) {
      api
        .get("app/rooms/")
        .then((res) => setRooms(res.data))
        .catch((err) => console.error(err));
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      gender: "",
      email: "",
      address: "",
      room: "",
      contact_number: "",
      guardian_name: "",
      guardian_contact: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("app/boarders/", {
        ...formData,
        joined: new Date().toISOString().slice(0, 10),
        status: "Pending",
      });

      setLoading(false);
      resetForm();
      setOpen(false);
      onSaved();
    } catch (err) {
      console.error("Failed to save tenant:", err);
      setLoading(false);
      alert("Could not save tenant");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Tenant</DialogTitle>
          <DialogDescription>Fill in all required fields.</DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-4">

          {/* 2-COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Name */}
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={formData.username}
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
                type="email"
                name="email"
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
              <Label>Contact</Label>
              <Input
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>

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

            {/* Password Field */}
            <div className="grid gap-2">
              <Label>Assign Password</Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create login password"
                required
              />
            </div>

          </div>

          {/* FOOTER */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Tenant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
