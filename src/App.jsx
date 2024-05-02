import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinshed, setshowFinshed] = useState(true)
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinshed = (e) => {
    setshowFinshed(!showFinshed)
  }


  const handleEdit = (id) => {
    const editedTodo = todos.find(todo => todo.id === id);
    setTodo(editedTodo.todo);
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos();
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
      saveTodos();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && todo.trim() !== '') {
      handleAdd()
        ;
    }
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveTodos();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='text-center font-bold text-xl'>INote - manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input
            ref={inputRef}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={todo}
            type="text"
            className='w-full py-2 px-1 rounded-xl border-none outline-none' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 text-sm font-bold text-white rounded-md'> Add</button>
        </div>
        <input type="checkbox" checked={showFinshed} onChange={toggleFinshed} /> show Finshed
        <h2 className='text-lg font-bold'>Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}

          {todos.map(item => {
            return (showFinshed || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 w-full">
              <div className='flex gap-5'>
                <input
                  name={item.id}
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mr-2"
                />
                <div className={` ${item.isCompleted ? "line-through" : ""}`}>
                  <p className='w-20 md:w-72 overflow-hidden overflow-ellipsis whitespace-nowrap'>{item.todo}</p>
                  
                </div>
              </div>
              <div className="button flex">
                <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 mx-1 text-lg font-bold text-white rounded-md'><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950  p-2 py-1 mx-2  text-lg font-bold text-white rounded-md'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
