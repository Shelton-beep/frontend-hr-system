"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from "@/services/job-service";
import { cn } from "@/lib/utils";
import { differenceInDays } from "date-fns";

export const jobVacancyColums: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "jobLocation",
    header: "Location",
  },

  {
    accessorKey: "applicationDeadline",
    header: "Closing Date",
    cell: ({ row }) => {
      const dateString = row.getValue("applicationDeadline"); // Get the date string

      // Assert the type of dateString as a string to ensure type safety
      if (typeof dateString !== "string") {
        return <div className="font-medium">Invalid Date</div>; // Handle invalid cases
      }

      // Parse the date string into a Date object
      const date = new Date(dateString);

      // Format the date using Intl.DateTimeFormat
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const applicationDeadline = new Date(row.getValue("applicationDeadline"));
      const createdAt = new Date();

      // Calculate difference in days
      const daysDifference = differenceInDays(applicationDeadline, createdAt);

      let status;
      if (daysDifference > 0) {
        status = "Open";
      } else if (daysDifference === 0) {
        status = "Closing Today";
      } else {
        status = "Closed";
      }

      return (
        <div
          className={cn(
            "rounded-md px-2 text-sm font-thin w-fit",
            status === "Open" ? "bg-green-300 text-green-800" : "",
            status === "Closing Today" ? "bg-orange-300 text-orange-800" : "",
            status === "Closed" ? "bg-red-300 text-red-800" : ""
          )}
        >
          <p>{status}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job.id.toString())}
            >
              View Job Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Job</DropdownMenuItem>
            <DropdownMenuItem>Delete Job</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
