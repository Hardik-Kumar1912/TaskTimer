import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeToTasks, updateTaskTime } from "../redux/taskSlice";
import { useParams } from "react-router-dom";
import { convertSecondsToHMS } from "../../timeConversion.js";
import { Check } from "lucide-react";

const Viewtask = () => {
  const dispatch = useDispatch();
  const alltasks = useSelector((state) => state.task.tasks);
  const { id } = useParams();
  const task = alltasks.find((p) => p._id === id);

  const [count, setCount] = useState(() => {
    const savedTime = localStorage.getItem(`taskTime-${task._id}`);
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const intervalId = useRef(null);

  useEffect(() => {
    if (count !== 0) {
      localStorage.setItem(`taskTime-${task._id}`, count);
      dispatch(updateTaskTime({ id: task._id, time: count }));
    }
  }, [count, task._id, dispatch]);

  function handleContinue() {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1); 
      }, 1000);
    }
  }

  function handlePause() {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  function handleComplete() {
    dispatch(completeToTasks(task));
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-6 items-start">

        {/* Title and Buttons */}
        <div className="w-full flex flex-col gap-4 mb-3">
          <input
            type="text"
            disabled
            className="w-full mb-3 text-black border-2 border-input rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={task.title}
          />

          {!task.isCompleted && (
            <div className="flex flex-row gap-4 justify-start items-center w-full">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleContinue}
              >
                {count == 0 ? "Start" : "Continue"}
              </button>

              <button
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700"
                onClick={handlePause}
              >
                Pause
              </button>
            </div>
          )}
        </div>

        {/* Timer */}
        <div className="w-full flex flex-col gap-3 justify-start items-start mt-5">
          <div className="text-xl text-gray-600 font-semibold mb-3">
            {task.isCompleted ? "Time taken " : "Time Elapsed"} :{" "}
            {convertSecondsToHMS(count)}
          </div>

          {!task.isCompleted && (
            <div className="flex flex-row gap-4 justify-start items-center w-full">
              <button
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-green-500 dark:hover:bg-green-600"
                onClick={handleComplete}
              >
                Mark as Completed
              </button>
            </div>
          )}

          {task.isCompleted && (
            <div className="flex flex-row gap-4 justify-start items-center w-20px h-20px rounded-[50%] bg-green-400 p-1">
              <Check className="text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-5 text-black border-2 border-input rounded-md p-0 w-full caret-transparent">
          <textarea
            className="rounded-2xl min-w-[500px] p-2 w-full outline-none focus-visible:ring-0 pt-3 resize-none caret-black"
            placeholder={task.content}
            disabled
            rows={19}
          />
        </div>
      </div>
    </div>
  );
};

export default Viewtask;
