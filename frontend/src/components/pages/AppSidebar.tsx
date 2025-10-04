import { useState } from "react";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./Theme-Provider";

export default function AppSidebarExample() {
  const [activeFilter, setActiveFilter] = useState<"all" | "tweets" | "videos" | "documents" | "links" | "tags">("all");
  
  const counts = {
    all: 12,
    tweets: 5,
    videos: 3,
    documents: 2,
    links: 1,
    tags: 8,
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="h-screen w-[280px]">
          <AppSidebar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
