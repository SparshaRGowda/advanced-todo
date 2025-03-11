import { useState } from "react";
import { ListItem } from "./Listitem";
import { ItemProps } from "./Listitem";

type TodoProps<T extends ItemProps> = {
  heading: string;
  list: T[];
  listType: "todo" | "inProgress" | "completed";
  onDelete: (id: number, listType: "todo" | "inProgress" | "completed") => void;
  onNext: (item: ItemProps) => void;
  onPrev: (item: ItemProps) => void;
};

export const Todo = <T extends ItemProps>({
  heading,
  list,
  listType,
  onDelete,
  onNext,
  onPrev,
}: TodoProps<T>) => {
  const [sortBy, setSortBy] = useState<string>("");
  let sortedItems = [];

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  if (sortBy === "name") {
    sortedItems = list.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "priority") {
    sortedItems = list
      .slice()
      .sort((a, b) =>
        a.priority && b.priority ? a.priority - b.priority : a.id - b.id
      );
  } else {
    sortedItems = list;
  }

  return (
    <div className="w-[300px] bg-orange-100 h-[500px]">
      <div className="flex justify-between items-center p-2 bg-orange-300">
        <h3 className="">{heading}</h3>
        <select
          value={sortBy}
          onChange={(e) => handleSort(e)}
          className="space-x-2"
        >
          <option value="input">Sort by input</option>
          <option value="name">Sort by name</option>
          <option value="priority">Sort by priority</option>
        </select>
      </div>
      <ul className="flex flex-col gap-3">
        {sortedItems.map((item) => (
          <ListItem
            item={item}
            listType={listType}
            onDelete={onDelete}
            onNext={onNext}
            onPrev={onPrev}
          />
        ))}
      </ul>
    </div>
  );
};
