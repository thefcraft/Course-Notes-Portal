import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Plus, Sparkles, BadgeCheck } from 'lucide-react';

interface FABMenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface FABMenuProps {
  items: FABMenuItem[];
  fabLabel?: string; // Optional label for the FAB button
}

const FABMenu: React.FC<FABMenuProps> = ({ items, fabLabel = 'FAB Menu' }) => {
  const [fabOpen, setFabOpen] = useState(false);

  const toggleFab = () => {
    setFabOpen((prev) => !prev);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={toggleFab}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        aria-label={fabLabel}
      >
        <Plus className="h-8 w-8" />
      </DropdownMenuTrigger>

      {fabOpen && (
        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={10}
          className="fixed bottom-20 right-10 bg-zinc-950 border shadow-lg p-4 rounded-lg w-52"
        >
          <DropdownMenuLabel className="font-semibold text-white">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer p-2 border-b hover:bg-zinc-800 rounded text-white"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default FABMenu;
