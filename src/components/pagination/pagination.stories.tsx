import type { Meta, StoryObj } from "@storybook/react";
import ITPagination from "./pagination";
import { useState } from "react";

const meta: Meta<typeof ITPagination> = {
  title: "Components/Data Display/ITPagination",
  component: ITPagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
    siblingCount: { control: "number" },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITPagination>;

const PaginationWrapper = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <ITPagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
    color: "primary",
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 50,
    siblingCount: 1,
    color: "primary",
  },
};

export const MiddlePageOpened: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 1,
    color: "primary",
  },
};

export const WithItemsPerPage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = 500;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <ITPagination
        {...args}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        itemsPerPageOptions={[10, 20, 30, 50]}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
        totalItems={totalItems}
      />
    );
  },
  args: {
    color: "primary",
    className: "w-[600px]" // Make it wide enough to see the layout
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map((color) => (
        <div key={color} className="flex gap-4 items-center">
            <span className="w-20 text-sm font-bold text-gray-500 capitalize">{color}</span>
             <PaginationWrapper {...args} color={color} />
        </div>
      ))}
    </div>
  ),
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};
