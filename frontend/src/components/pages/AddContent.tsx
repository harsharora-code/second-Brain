import { AddContentDialog } from "./Content";
import { ThemeProvider } from './Theme-Provider'
import type { InsertNote } from "./Schema";

export default function AddContentDialogExample() {
  const handleAdd = (note: InsertNote) => {
    console.log("Add note:", note);
  };

  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-[200px] flex items-center justify-center">
        <AddContentDialog onAdd={handleAdd} />
      </div>
    </ThemeProvider>
  );
}
