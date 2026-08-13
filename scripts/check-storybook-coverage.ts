/**
 * Ensures every public UI / game / display / pattern / template export has Storybook coverage.
 * Requires a dedicated story file (or an allowlisted shared story title) that imports the export.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Named exports that are compositional subparts / portals / utilities — covered via parent stories. */
const ALLOWLIST = new Set([
  "toCompactConnectionState",
  "VOTE_STATUS_PIP_THRESHOLD",
  "alertVariants",
  "badgeVariants",
  "buttonVariants",
  "panelVariants",
  "toggleVariants",
  "navigationMenuTriggerStyle",
  // Compound subcomponents are exercised by parent component stories.
  "AccordionContent",
  "AccordionItem",
  "AccordionTrigger",
  "AlertDialogAction",
  "AlertDialogCancel",
  "AlertDialogContent",
  "AlertDialogDescription",
  "AlertDialogFooter",
  "AlertDialogHeader",
  "AlertDialogOverlay",
  "AlertDialogPortal",
  "AlertDialogTitle",
  "AlertDialogTrigger",
  "AvatarFallback",
  "AvatarImage",
  "BreadcrumbEllipsis",
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbList",
  "BreadcrumbPage",
  "BreadcrumbSeparator",
  "CalendarDayButton",
  "CardContent",
  "CardDescription",
  "CardFooter",
  "CardHeader",
  "CardTitle",
  "CarouselContent",
  "CarouselItem",
  "CarouselNext",
  "CarouselPrevious",
  "CollapsibleContent",
  "CollapsibleTrigger",
  "CommandDialog",
  "CommandEmpty",
  "CommandGroup",
  "CommandInput",
  "CommandItem",
  "CommandList",
  "CommandSeparator",
  "CommandShortcut",
  "ContextMenuCheckboxItem",
  "ContextMenuContent",
  "ContextMenuGroup",
  "ContextMenuItem",
  "ContextMenuLabel",
  "ContextMenuPortal",
  "ContextMenuRadioGroup",
  "ContextMenuRadioItem",
  "ContextMenuSeparator",
  "ContextMenuShortcut",
  "ContextMenuSub",
  "ContextMenuSubContent",
  "ContextMenuSubTrigger",
  "ContextMenuTrigger",
  "DialogClose",
  "DialogContent",
  "DialogDescription",
  "DialogFooter",
  "DialogHeader",
  "DialogOverlay",
  "DialogPortal",
  "DialogTitle",
  "DialogTrigger",
  "DrawerClose",
  "DrawerContent",
  "DrawerDescription",
  "DrawerFooter",
  "DrawerHeader",
  "DrawerOverlay",
  "DrawerPortal",
  "DrawerTitle",
  "DrawerTrigger",
  "DropdownMenuCheckboxItem",
  "DropdownMenuContent",
  "DropdownMenuGroup",
  "DropdownMenuItem",
  "DropdownMenuLabel",
  "DropdownMenuPortal",
  "DropdownMenuRadioGroup",
  "DropdownMenuRadioItem",
  "DropdownMenuSeparator",
  "DropdownMenuShortcut",
  "DropdownMenuSub",
  "DropdownMenuSubContent",
  "DropdownMenuSubTrigger",
  "DropdownMenuTrigger",
  "EmptyContent",
  "EmptyDescription",
  "EmptyHeader",
  "EmptyMedia",
  "EmptyTitle",
  "FormControl",
  "FormDescription",
  "FormField",
  "FormItem",
  "FormLabel",
  "FormMessage",
  "HoverCardContent",
  "HoverCardTrigger",
  "InputOTPGroup",
  "InputOTPSeparator",
  "InputOTPSlot",
  "MenubarCheckboxItem",
  "MenubarContent",
  "MenubarGroup",
  "MenubarItem",
  "MenubarLabel",
  "MenubarMenu",
  "MenubarPortal",
  "MenubarRadioGroup",
  "MenubarRadioItem",
  "MenubarSeparator",
  "MenubarShortcut",
  "MenubarSub",
  "MenubarSubContent",
  "MenubarSubTrigger",
  "MenubarTrigger",
  "NavigationMenuContent",
  "NavigationMenuIndicator",
  "NavigationMenuItem",
  "NavigationMenuLink",
  "NavigationMenuList",
  "NavigationMenuTrigger",
  "NavigationMenuViewport",
  "PaginationContent",
  "PaginationEllipsis",
  "PaginationItem",
  "PaginationLink",
  "PaginationNext",
  "PaginationPrevious",
  "PanelDescription",
  "PanelHeader",
  "PanelTitle",
  "PopoverContent",
  "PopoverTrigger",
  "RadioGroupItem",
  "ResizableHandle",
  "ResizablePanel",
  "ResizablePanelGroup",
  "ScrollBar",
  "SelectContent",
  "SelectGroup",
  "SelectItem",
  "SelectLabel",
  "SelectScrollDownButton",
  "SelectScrollUpButton",
  "SelectSeparator",
  "SelectTrigger",
  "SelectValue",
  "SheetClose",
  "SheetContent",
  "SheetDescription",
  "SheetFooter",
  "SheetHeader",
  "SheetOverlay",
  "SheetPortal",
  "SheetTitle",
  "SheetTrigger",
  "TableBody",
  "TableCaption",
  "TableCell",
  "TableFooter",
  "TableHead",
  "TableHeader",
  "TableRow",
  "TabsContent",
  "TabsList",
  "TabsTrigger",
  "ToggleGroupItem",
  "TooltipContent",
  "TooltipProvider",
  "TooltipTrigger",
  "toast",
]);

/** Root components that must have a dedicated story file importing them. */
const REQUIRED_STORY_ROOTS: Array<{ name: string; storyGlobHint: string }> = [
  // Patterns & shells (Examples IA)
  { name: "ParticipantJoinFlow", storyGlobHint: "stories/components/examples/patterns" },
  { name: "FacilitatorLobby", storyGlobHint: "stories/components/examples/patterns" },
  { name: "SharedDisplayLobby", storyGlobHint: "stories/components/examples/patterns" },
  { name: "Decision", storyGlobHint: "stories/components/examples/patterns" },
  { name: "TimedRound", storyGlobHint: "stories/components/examples/patterns" },
  { name: "Briefing", storyGlobHint: "stories/components/examples/patterns" },
  { name: "ScriptedReveal", storyGlobHint: "stories/components/examples/patterns" },
  { name: "Results", storyGlobHint: "stories/components/examples/patterns" },
  { name: "Debrief", storyGlobHint: "stories/components/examples/patterns" },
  { name: "FacilitatorConsole", storyGlobHint: "stories/components/examples/patterns" },
  { name: "SharedDisplayGame", storyGlobHint: "stories/components/examples/patterns" },
  { name: "AttentionTakeover", storyGlobHint: "stories/components/examples/patterns" },
  { name: "ParticipantShell", storyGlobHint: "stories/components/examples" },
  { name: "FacilitatorShell", storyGlobHint: "stories/components/examples" },
  { name: "SharedDisplayShell", storyGlobHint: "stories/components/examples" },
];

function walk(dir: string, out: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".stories.tsx")) out.push(full);
  }
  return out;
}

function namedExportsFromIndex(indexPath: string) {
  const text = readFileSync(indexPath, "utf8");
  const names = new Set<string>();
  for (const match of text.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of match[1]!.split(",")) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith("type ")) continue;
      const name = trimmed.split(/\s+as\s+/)[0]!.trim();
      if (name && /^[A-Z]/.test(name)) names.add(name);
    }
  }
  return [...names].sort();
}

function kebabCase(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** Export name → story filename stem when it differs from kebab-case(export). */
const STORY_FILE_ALIASES: Record<string, string> = {
  Toaster: "sonner",
};

function main() {
  const storyFiles = walk(path.join(root, "stories"));
  const storyTextByFile = new Map(
    storyFiles.map((file) => [file, readFileSync(file, "utf8")] as const),
  );
  const allStoryText = [...storyTextByFile.values()].join("\n");

  const indexes = [
    path.join(root, "src/components/ui/index.ts"),
    path.join(root, "src/components/game/index.ts"),
    path.join(root, "src/components/display/index.ts"),
  ];

  const failures: string[] = [];

  for (const indexPath of indexes) {
    const area = path.basename(path.dirname(indexPath)); // ui | game | display
    for (const name of namedExportsFromIndex(indexPath)) {
      if (ALLOWLIST.has(name)) continue;
      if (!new RegExp(`\\b${name}\\b`).test(allStoryText)) {
        failures.push(`No Storybook reference for export ${name} (${area})`);
        continue;
      }
      const stem = STORY_FILE_ALIASES[name] ?? kebabCase(name);
      const dedicated = path.join(root, "stories/components", area, `${stem}.stories.tsx`);
      const dedicatedText = storyTextByFile.get(dedicated);
      if (!dedicatedText || !new RegExp(`\\b${name}\\b`).test(dedicatedText)) {
        failures.push(
          `Missing dedicated story file stories/components/${area}/${kebabCase(name)}.stories.tsx importing ${name}`,
        );
      } else {
        const namedStories = dedicatedText.match(/^export const \w+/gm) ?? [];
        if (namedStories.length < 1) {
          failures.push(`Story file for ${name} has no named story exports`);
        }
      }
    }
  }

  for (const required of REQUIRED_STORY_ROOTS) {
    const matching = [...storyTextByFile.entries()].filter(
      ([file, text]) =>
        file.includes(required.storyGlobHint) && new RegExp(`\\b${required.name}\\b`).test(text),
    );
    if (matching.length === 0) {
      failures.push(
        `Pattern/template ${required.name} missing from stories under ${required.storyGlobHint}`,
      );
    }
  }

  // Minimum depth: join / lobby / shared-display lobby / shells must expose multiple states.
  const joinStories = [...storyTextByFile.entries()].find(([file]) =>
    file.endsWith("stories/components/examples/patterns/join-flow.stories.tsx"),
  )?.[1];
  const lobbyStories = [...storyTextByFile.entries()].find(([file]) =>
    file.endsWith("stories/components/examples/patterns/lobby.stories.tsx"),
  )?.[1];
  const sharedDisplayLobbyStories = [...storyTextByFile.entries()].find(([file]) =>
    file.endsWith("stories/components/examples/patterns/shared-display-lobby.stories.tsx"),
  )?.[1];
  const shellStories = [...storyTextByFile.entries()].find(([file]) =>
    file.endsWith("stories/components/examples/shells.stories.tsx"),
  )?.[1];

  for (const required of ["InvalidCode", "EnterIdentity", "Waiting", "Disconnected"]) {
    if (!joinStories || !new RegExp(`export const ${required}\\b`).test(joinStories)) {
      failures.push(`Patterns/Join Flow missing required story export ${required}`);
    }
  }
  for (const required of ["FacilitatorEmpty", "FacilitatorReady"]) {
    if (!lobbyStories || !new RegExp(`export const ${required}\\b`).test(lobbyStories)) {
      failures.push(`Patterns/Lobby missing required story export ${required}`);
    }
  }
  for (const required of ["SharedDisplayJoin", "SharedDisplayReady"]) {
    if (
      !sharedDisplayLobbyStories ||
      !new RegExp(`export const ${required}\\b`).test(sharedDisplayLobbyStories)
    ) {
      failures.push(`Patterns/Shared Display Lobby missing required story export ${required}`);
    }
  }
  for (const required of ["ParticipantBare", "FacilitatorBare", "SharedDisplayBare"]) {
    if (!shellStories || !new RegExp(`export const ${required}\\b`).test(shellStories)) {
      failures.push(`Components/Examples/Shells missing required story export ${required}`);
    }
  }

  if (failures.length > 0) {
    console.error("[storybook:coverage] FAILED");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }

  console.log(
    `[storybook:coverage] passed (${storyFiles.length} story files; public roots + pattern states covered)`,
  );
}

main();
