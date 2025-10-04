import { ShareBrainDialog } from "./Share-Brain";
import { ThemeProvider } from "./Theme-Provider";

export default function ShareBrainDialogExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-[200px] flex items-center justify-center">
        <ShareBrainDialog />
      </div>
    </ThemeProvider>
  );
}
