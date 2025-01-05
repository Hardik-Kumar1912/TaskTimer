import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  tasks: (() => {
    const storedTasks = localStorage.getItem("tasks");
    try {
      
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      return []; 
    }
  })(),
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addToTasks: (state,action) => {
        const task=action.payload;
        state.tasks.push(task);
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
        toast("Task Created Successfully")
    },

    deleteToTasks: (state, action) => {
      const taskId = action.payload;
      const index = state.tasks.findIndex((item) => item._id === taskId);

      if (index >= 0) {
        state.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        toast.success("Task deleted");
      }
    },

    completeToTasks: (state, action) => {
      const task = action.payload;
      const index = state.tasks.findIndex((item) => item._id === task._id);
    
      if (index >= 0) {
        state.tasks[index].isCompleted = true; 
    
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    
        toast.success("Task marked as completed");
      }
    },
    updateTaskTime: (state, action) => {
      const { id, time } = action.payload;
      const task = state.tasks.find((task) => task._id === id);
      if (task) {
        task.time = time; 
      }
    },
  },
})

export const { addToTasks , deleteToTasks , completeToTasks , updateTaskTime} = taskSlice.actions

export default taskSlice.reducer