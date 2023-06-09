import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";

export interface Todo {
  title: string;
  status: boolean;
  _id: number | string;
}
export interface DataIF {
  todos: Todo[]
}

function App() {
  const [data, setData] = useState<DataIF | undefined>(undefined);
  console.log(data);

  useEffect(() => {
    fetch('https://todo-backend.cyclic.app/get-todo')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  const newData = (data: DataIF) => {
    setData(data)
  }

  return (
    <main className="max-w-4xl mx-auto px-5">
      <AddTodo newData={newData} />
      <div className="grid grid-cols-2 gap-4 mt-12 place-content-start h-[424px] overflow-y-auto p-2" id="scrollbar">
        {data?.todos.map((item: Todo, index: number) => <TodoCard key={index} item={item} newData={newData} />)}
      </div>
    </main>
  )
}

export default App
