import React from 'react';
import { Textarea } from "@/components/ui/textarea";

function AdditionalReq({ selectedAdditionalReq }) {
  return (
    <div className="w-full mt-4">
      <label htmlFor="" className='text-slate-400 mb-2 block'>Additional Requirements (Optional)</label>
      <Textarea
        placeholder="Please provide any additional requirements or specifications you have in mind for your interior design project."
        className="mt-2"
        rows={4}
        onChange={(e) => selectedAdditionalReq(e.target.value)}
      />
      <p className="text-gray-400 text-sm mt-2">
        Feel free to share any specific ideas, color preferences, or styles you envision for your space.
      </p>
    </div>
  );
}

export default AdditionalReq;
