import TodoAddTask from '../todoAddTask/TodoAddTask';
import TodoFilters from '../todoFilters/TodoFilters';
import TodoList from '../todoList/TodoList';

import './app.scss';

function App() {
  return (
    <main className="App">
      <div className="content">
        <TodoAddTask/>
        <h2>Todo List</h2>
        <TodoFilters/>
        <TodoList/>
      </div>
    </main>
  );
}

export default App;
