import React from 'react'

export const Callout = ({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) => {
  const styles =
    type === "warning"
      ? "bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-700"
      : type === "success"
      ? "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-700"
      : "bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-700";

  const icon =
    type === "warning" ? "⚠️" : type === "success" ? "✅" : "💡";

  return (
    <div className={`border rounded-lg p-3 flex gap-3 items-start ${styles}`}>
      <span className="text-base leading-none pt-0.5">{icon}</span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
