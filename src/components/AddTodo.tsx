import { useState } from 'react'
import { DataIF } from '../App';

interface AddTodoProps {
  newData: (data: DataIF) => void;
}

const AddTodo = ({ newData }: AddTodoProps) => {

  const [todo, setTodo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch('https://todo-backend.cyclic.app/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: todo,
        status: false
      })
    })
      .then(() => {
        updateData()
      })
      .catch(error => console.log(error));
    setTodo("")
  }

  const updateData = () => {
    fetch('https://todo-backend.cyclic.app/get-todo')
      .then(response => response.json())
      .then(data => newData(data))
      .catch(error => console.log(error));
  }

  return (
    <div className="px-6 py-8 shadow-lg rounded-xl w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <input type="text" className="block outline-none border border-gray-400 rounded h-9 w-full px-2"
          onChange={(e) => setTodo(e.target.value)}
          required
          value={todo}
        />
        <button type="submit" className="mt-4 px-4 py-2 block mx-auto w-fit rounded font-semibold text-base leading-5 text-white bg-teal-600">
          {/* {mutation.isLoading ? " Loading..." : "Add Todo"} */}
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
