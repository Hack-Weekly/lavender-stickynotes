import { IconButton, SpeedDial, SpeedDialHandler } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Add() {
  return (
    <>
    <div className="fixed bottom-4 right-4 p-7"> {/* Adjust the positioning as needed */}
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
      </SpeedDial>
    </div>
    </>
  );
}
