import { Brain, Twitter, Video, FileText, Link as LinkIcon, Hash } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../ui/sidebar";

type SidebarFilter = "all" | "tweets" | "videos" | "documents" | "links" | "tags";

interface AppSidebarProps {
  activeFilter: SidebarFilter;
  onFilterChange: (filter: SidebarFilter) => void;
  counts: Record<SidebarFilter, number>;
}

const menuItems = [
  { id: "tweets" as const, title: "Tweets", icon: Twitter },
  { id: "videos" as const, title: "Videos", icon: Video },
  { id: "documents" as const, title: "Documents", icon: FileText },
  { id: "links" as const, title: "Links", icon: LinkIcon },
  { id: "tags" as const, title: "Tags", icon: Hash },
];

export function AppSidebar({ activeFilter, onFilterChange, counts }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <button
          onClick={() => onFilterChange("all")}
          className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md p-2 -m-2"
          data-testid="button-home"
        >
          <Brain className="h-6 w-6" />
          <span className="text-lg font-semibold">Second Brain</span>
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onFilterChange(item.id)}
                    isActive={activeFilter === item.id}
                    data-testid={`button-filter-${item.id}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {counts[item.id] > 0 && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {counts[item.id]}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
