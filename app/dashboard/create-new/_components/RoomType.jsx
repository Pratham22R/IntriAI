import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RoomType({ selectedRoomType }) {
  return (
    <div className="w-full">
      <label htmlFor="" className="text-slate-400 mb-2 block">Select Room Type*</label>
      <Select onValueChange={(value)=>selectedRoomType(value)}>
        <SelectTrigger className="w-full text-black">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger> 
        <SelectContent className="w-full ">
          <SelectItem value="Bedroom">Bedroom</SelectItem>
          <SelectItem value="Bathroom">Bathroom</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Livingroom">Living Room</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomType;
