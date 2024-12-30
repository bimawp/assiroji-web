import { Loader2 } from 'lucide-react';
import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
    </div>
  );
}
