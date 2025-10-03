import { ThemeProvider } from "../theme-provider";
import { ThemeToggle } from "./Theme-Toggle";

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-4 bg-background text-foreground min-h-[200px] flex items-center justify-center">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
