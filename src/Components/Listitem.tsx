export interface ItemProps {
  id: number;
  name: string;
  priority: number | undefined;
}

interface ListItemProps {
  item: ItemProps;
  listType: "todo" | "inProgress" | "completed";
  onDelete: (id: number, listType: "todo" | "inProgress" | "completed") => void;
  onNext: (item: ItemProps) => void;
  onPrev: (item: ItemProps) => void;
}
export const ListItem = ({
  item,
  listType,
  onDelete,
  onNext,
  onPrev,
}: ListItemProps) => {
  return (
    <>
      <li className="flex justify-between items-center bg-emerald-200 p-2">
        <div className="flex-1 break-all">
          <p>{item.name}</p>
        </div>
        <p className="w-8 h-8 flex items-center justify-center mr-5 ml-5 bg-orange-200">
          {item.priority}
        </p>
        <div className="flex space-x-2">
          {listType !== "todo" ? (
            <button
              className="p-1 bg-gray-200 rounded"
              onClick={() => onPrev(item)}
            >
              &larr;
            </button>
          ) : null}
          {listType !== "completed" ? (
            <button
              className="p-1 bg-gray-200 rounded"
              onClick={() => onNext(item)}
            >
              &rarr;
            </button>
          ) : null}

          <button
            className="p-1 bg-red-400 text-white rounded"
            onClick={() => onDelete(item.id, listType)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
};
