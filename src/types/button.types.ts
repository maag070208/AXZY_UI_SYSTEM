export const buttonVariants: Record<string, string> = {
  filled: "border-transparent shadow-sm",
  outlined: "bg-transparent border-2",
  raised: "border-transparent shadow-md",
  rounded: "border-transparent shadow-sm rounded-full",
  text: "bg-transparent border-transparent shadow-none hover:bg-opacity-10",
  "raised-text": "bg-white border border-gray-200 shadow-sm hover:shadow-md",
  "icon-only": "p-2 aspect-square flex items-center justify-center border-transparent shadow-sm",
  link: "bg-transparent border-transparent shadow-none hover:underline px-0",
};

export const buttonSizes: Record<string, string> = {
  small: "text-xs px-3 py-1.5",
  medium: "text-sm px-5 py-2.5",
  large: "text-lg px-6 py-3",
};
