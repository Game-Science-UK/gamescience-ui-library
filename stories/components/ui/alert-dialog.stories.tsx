import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDestructiveAction: Story = {
  render: () => (
    <StoryFrame>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button intent="danger">End session</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End session for all participants?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All in-progress votes will be discarded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({ intent: "danger" })}>
              End session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </StoryFrame>
  ),
};

export const ConfirmSaveChanges: Story = {
  render: () => (
    <StoryFrame>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Save facilitator notes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes before advancing?</AlertDialogTitle>
            <AlertDialogDescription>
              Unsaved notes will be lost if you continue without saving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction>Save and continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </StoryFrame>
  ),
};
