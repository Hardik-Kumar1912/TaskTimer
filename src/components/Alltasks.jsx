import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, MoveUpRight } from "lucide-react";
import { deleteToTasks } from "../redux/taskSlice";
import { convertSecondsToHMS } from "../../timeConversion.js";
import { FormatDate } from "../FormatDate.js";

const Alltasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredData = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showTime(taskId) {
    const savedTime = localStorage.getItem(`taskTime-${taskId}`);
    return savedTime ? convertSecondsToHMS(savedTime) : 0; 
  }

  function moveToTask(taskId) {
    navigate(`/alltasks/${taskId}`);
  }

  function deleteTask(taskId) {
    dispatch(deleteToTasks(taskId));
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          className="text-black border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
          type="search"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="w-full h-full px-4 pt-4 flex flex-col gap-y-5 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
            All Tasks
          </h2>

          {/* Header */}
          <div className="hidden md:flex items-center gap-4 py-2 px-4 bg-gray-50 text-gray-700 font-medium">
            <div className="flex-1">Title</div>
            <div className="w-20 text-center">Time</div>
            <div className="w-20 text-center">Move</div>
            <div className="w-28 text-center">Status</div>
            <div className="w-36 text-center">Created At</div>
            <div className="w-20 text-center">Delete</div>
          </div>

          {/* Tasks */}
          {filteredData.length > 0 ? (
            filteredData.map((task) => (
              <div
                className="flex flex-col md:flex-row items-start md:items-center gap-4 py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition-all rounded-md"
                key={task?._id}
              >
                {/* Title */}
                <div className="flex-1 text-gray-800">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Title:
                  </span>{" "}
                  {task?.title}
                </div>

                {/* Time */}
                <div className="w-full md:w-20 text-left md:text-center text-gray-600">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Time:
                  </span>{" "}
                  {showTime(task._id)}
                </div>

                {/* Move */}
                <div className="w-full md:w-20 text-left md:text-center">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Move:
                  </span>
                  <button
                    onClick={() => moveToTask(task?._id)}
                    className="text-blue-500 hover:underline hover:text-blue-600"
                  >
                    <MoveUpRight />
                  </button>
                </div>

                {/* Status */}
                <div className="w-full md:w-28 text-left md:text-center">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Status:
                  </span>
                  <span
                    className={`px-2 py-1 text-sm rounded-md ${
                      task?.isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {task?.isCompleted ? "Completed" : "Pending"}
                  </span>
                </div>

                {/* Created At */}
                <div className="w-full md:w-36 text-left md:text-center text-gray-600">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Created At:
                  </span>{" "}
                  {FormatDate(task?.createdAt)}
                </div>

                {/* Delete */}
                <div className="w-full md:w-20 text-left md:text-center">
                  <span className="md:hidden text-gray-600 font-semibold">
                    Delete:
                  </span>
                  <button
                    className="text-red-500 hover:bg-red-100 p-2 rounded-md"
                    onClick={() => deleteTask(task?._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-600 py-4 text-center">
              No tasks found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alltasks;
