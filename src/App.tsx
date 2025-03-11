import { useState } from "react";
import { Header } from "./Components/Header";
import { Todo } from "./Components/Todo";
import { ItemProps } from "./Components/Listitem";

function App() {
  const [inputVal, setInputVal] = useState<string | undefined>();
  const [priorityVal, setPriorityVal] = useState<number | undefined>(1);
  const [todoList, setTodoList] = useState<ItemProps[]>([]);
  const [inProgressList, setInProgressList] = useState<ItemProps[]>([]);
  const [completedList, setCompletedList] = useState<ItemProps[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value as string);
  };

  const handlePriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityVal(Number(e.target.value));
  };

  const handleEnter = () => {
    if (inputVal !== undefined && inputVal.trim() !== "") {
      const id = Date.now();
      setTodoList((prev) => [
        ...prev,
        { id: id, name: inputVal, priority: priorityVal },
      ]);
    }
    setInputVal("");
  };

  const handleDelete = (
    id: number,
    listType: "todo" | "inProgress" | "completed"
  ) => {
    if (listType === "todo")
      setTodoList((prev) => prev.filter((obj) => obj.id !== id));
    if (listType === "inProgress")
      setInProgressList((prev) => prev.filter((obj) => obj.id !== id));
    if (listType === "completed")
      setCompletedList((prev) => prev.filter((obj) => obj.id !== id));
  };

  const handleNext = (item: ItemProps) => {
    if (todoList.map((item) => item.id).includes(item.id)) {
      setInProgressList((prev) => [...prev, item]);
      setTodoList((prev) => prev.filter((obj) => obj.id !== item.id));
    }
    if (inProgressList.map((item) => item.id).includes(item.id)) {
      setInProgressList((prev) => prev.filter((obj) => obj.id !== item.id));
      setCompletedList((prev) => [...prev, item]);
    }
  };

  const handlePrev = (item: ItemProps) => {
    if (inProgressList.map((item) => item.id).includes(item.id)) {
      setInProgressList((prev) => prev.filter((obj) => obj.id !== item.id));
      setTodoList((prev) => [...prev, item]);
    }
    if (completedList.includes(item)) {
      setCompletedList((prev) => prev.filter((obj) => obj.id !== item.id));
      setInProgressList((prev) => [...prev, item]);
    }
  };

  return (
    <>
      <Header
        inputVal={inputVal}
        priVal={priorityVal}
        onPriChange={handlePriChange}
        onInputChange={handleInput}
        onEnter={handleEnter}
      />
      <div className="grid grid-cols-3 gap-5 p-20 m-10 items-center justify-center">
        <Todo
          heading="ToDo"
          list={todoList}
          listType="todo"
          onDelete={handleDelete}
          onNext={handleNext}
        />
        <Todo
          heading="In Progress"
          list={inProgressList}
          listType="inProgress"
          onDelete={handleDelete}
          onNext={handleNext}
          onPrev={handlePrev}
        />
        <Todo
          heading="Completed"
          list={completedList}
          listType="completed"
          onDelete={handleDelete}
          onPrev={handlePrev}
        />
      </div>
    </>
  );
}

export default App;
