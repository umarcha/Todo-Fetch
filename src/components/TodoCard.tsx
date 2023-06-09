import { DataIF, Todo } from "../App";

interface TodoCardProps {
  item: Todo;
  newData: (data: DataIF) => void
}

const TodoCard = ({ item, newData }: TodoCardProps) => {

  // Update the Status When user click on checkbox
  const updateStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const status = e.target.checked;
    fetch(`https://todo-backend.cyclic.app/update/${item._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        updateData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Delete the TodoCard when user click on Delete_Button
  const handleDelete = () => {
    fetch(`https://todo-backend.cyclic.app/delete/${item._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        updateData()
      })
  }

  // This is function Will be called whenever user Delete Card and Update the Status to Keep UI Updated 
  const updateData = () => {
    fetch('https://todo-backend.cyclic.app/get-todo')
      .then(response => response.json())
      .then(data => newData(data))
      .catch(error => console.log(error));
  }
  return (
    <div className="px-4 py-6 rounded-md bg-white shadow-md">
      <div className="flex gap-3 justify-between items-center">
        <h5 className={`${item.status && 'line-through text-gray-400'}`}>{item.title}</h5>
        <input type="checkbox" checked={item.status}
          onChange={updateStatus}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 rounded-md px-3 py-2 text-xs text-white">
          {/* {deleteMutation.isLoading ? "Deleting" : "Delete"} */}
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoCard