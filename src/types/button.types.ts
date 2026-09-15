export const buttonVariants: Record<string, string> = {
  filled: "border-transparent shadow-sm",
  outlined: "bg-transparent border-2",
  raised: "border-transparent shadow-md",
  rounded: "border-transparent shadow-sm rounded-full",
  text: "bg-transparent border-transparent shadow-none hover:bg-black/5 dark:hover:bg-white/10",
  "raised-text": "bg-white border border-gray-200 shadow-sm hover:shadow-md",
  "icon-only": "p-2 aspect-square flex items-center justify-center border-transparent shadow-sm",
  link: "bg-transparent border-transparent shadow-none hover:underline px-0",
};

export const buttonSizes: Record<string, string> = {
  sm: "text-xs px-2.5 py-1",
  md: "text-[13px] px-3.5 py-1.5",
  lg: "text-sm px-4 py-2",
};
