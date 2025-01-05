import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToTasks } from "../redux/taskSlice.js";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function createTask() {
    const task = {
      title: title,
      content: value,
      _id: Date.now().toString(36),
      createdAt: new Date().toISOString(),
      isCompleted: false,
      time: 0,
    };

    dispatch(addToTasks(task));

    navigate(`/alltasks/${task?._id}`);
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-2 justify-between items-center">
          <input
            type="text"
            className="w-[85%] text-black border-2 border-input rounded-md p-2"
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createTask}
          >
            Add
          </button>
        </div>

        <div className="mt-5 text-black border-2 border-input rounded-md p-0 w-full caret-transparent box-border">
          <textarea
            className="rounded-2xl p-2 w-full outline-none focus-visible:ring-0 pt-3 resize-none caret-black box-border"
            placeholder="Write Task Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={19}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
