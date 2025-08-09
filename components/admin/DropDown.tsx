"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  values: { label: string; id: string; color: string }[];
  defaultValue: string;
  onSubmit: (selectedId: string) => Promise<void> | void;
};

const DropDown = ({ values, defaultValue, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  const defaultItem = values.filter((value) => value.id === defaultValue)[0];
  const [value, setValue] = useState(defaultItem);

  const onSelect = (item: { label: string; id: string; color: string }) => {
    setValue(item);
    setOpen(false);

    if (item.id === value.id) return;

    onSubmit(item.id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mx-auto">
        <span
          className="w-min h-min cursor-pointer py-1 px-[10px] rounded-2xl font-medium"
          style={{
            color: value.color,
            background: value.color + 33,
          }}
        >
          {value.label}
        </span>
      </PopoverTrigger>

      <PopoverContent className="w-[150px] p-0 border-none">
        <Command>
          <CommandList className="bg-white pt-3 px-2">
            <CommandGroup>
              {values.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => onSelect(item)}
                  className="flex justify-between items-center mb-2 "
                >
                  <div
                    className=" w-min h-min flex justify-center cursor-pointer  py-1 px-[10px] rounded-2xl font-medium"
                    style={{
                      color: item.color,
                      background: item.color + 33,
                    }}
                  >
                    {item.label}
                  </div>

                  <Check
                    className={cn(
                      "w-5 h-5",
                      item.id === value.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;
