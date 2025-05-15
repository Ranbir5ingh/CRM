import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { expenseDto, expenseSchema } from "../finance.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divide, Loader } from "lucide-react";

interface AddCustomerDialogBoxProps {
  onSubmit: (data: expenseDto) => Promise<void>;
  title: string;
}

export default function AddExpenserForm({
  onSubmit,
  title,
}: AddCustomerDialogBoxProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<expenseDto>({
    mode: "onChange",
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  async function handleSubmit(data: expenseDto) {
    startTransition(async () => {
        data.type = "EXPENSE";
      await onSubmit(data);
    });
    form.reset();
  }
  return (
    <div className="w-full  mx-auto p-10 bg-white text-black rounded-lg  ">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold  text-lg">
                    Description
                  </FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        placeholder="Enter Description"
                        {...field}
                        className="pl-8 bg-gray-100"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Amount</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        type="number"
                        placeholder="eg: 50"
                        {...field}
                        className="pl-8 bg-gray-100"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              // onClick={() => form.handleSubmit(onSubmit)}
              className="w-80 bg-black text-white hover:bg-gray-700 font-bold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  {"Adding"}
                </>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
