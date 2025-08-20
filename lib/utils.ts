import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const generateDueDate = () => {
  return new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  ).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateToMonthAndDay = (dateStr: string | null) => {
  if (!dateStr) return "Waiting for approval";
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return `Borrowed on ${date.toLocaleDateString("en-US", options)}`;
};

export const getDueStatus = (dueDate: string | null) => {
  if (!dueDate) return { status: "waiting", message: "Waiting for approval" };

  const due = new Date(dueDate);
  const current = new Date();

  const start = new Date(current.setHours(0, 0, 0, 0));
  const end = new Date(due.setHours(0, 0, 0, 0));

  const diff = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return { status: "overdue", message: "Overdue Return" };
  if (diff === 0) return { status: "borrowed", message: "Due today" };

  return {
    status: "borrowed",
    message: `${diff} day${diff > 1 ? "s" : ""} left to due`,
  };
};

export const getStatusTypes = (
  status: "pending" | "rejecting" | "approved" | "returned"
) => {
  switch (status) {
    case "approved":
      return { text: "Approved", color: "#027A48" };

    case "rejecting":
      return { text: "Rejected", color: "#C01048" };

    case "pending":
      return { text: "Pending", color: "#FFB300" };

    case "returned":
      return { text: "Returned", color: "#2ECC71" };

    default:
      return { text: status, color: "black" };
  }
};
