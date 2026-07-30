import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StoryFrame } from "../../_utils/story-frame";

type JoinFormValues = {
  displayName: string;
};

const meta = {
  title: "Components/UI/Form",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render() {
    const form = useForm<JoinFormValues>({
      defaultValues: { displayName: "" },
    });

    return (
      <StoryFrame>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => undefined)} className="w-full max-w-sm space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              rules={{ required: "Display name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Join session</Button>
          </form>
        </Form>
      </StoryFrame>
    );
  },
};
