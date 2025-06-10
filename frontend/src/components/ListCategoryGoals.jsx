import { FaPen, FaTrashAlt } from 'react-icons/fa'
import React, { useState } from "react";

const initialGoals = [
  { id: 1, title: "Run a marathon", due: "2024-12-31", priority: "High" },
  { id: 2, title: "Lose 10 pounds", due: "2024-06-30", priority: "Medium" },
  { id: 3, title: "Exercise 3 times a week", due: "Ongoing", priority: "High" },
  { id: 4, title: "Increase bench press by 20 pounds", due: "2024-09-30", priority: "Medium" },
  { id: 5, title: "Swim 1 mile", due: "2024-08-15", priority: "Low" },
];

const  ListCategoryGoal = () => {
  const [completedGoals, setCompletedGoals] = useState([]);

  const toggleGoal = (id) => {
    setCompletedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "";
    }
  };

  return (
    <div className="">
      <table className="w-full text-sm text-left border border-gray-200 rounded-lg ">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Goal</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Actions</th>
            <th className="px-4 py-3 text-center">Completed</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {initialGoals.map((goal, index) => (
            <tr
              key={goal.id}
              className={`border-t border-gray-400 hover:bg-gray-50 transition ${
                completedGoals.includes(goal.id) ? "line-through text-gray-400" : ""
              }`}
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{goal.title}</td>
              <td className="px-4 py-3">{goal.due}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm ${getPriorityColor(
                    goal.priority
                  )}`}
                >
                  {goal.priority}
                </span>
              </td>
              <td className='pe-6 py-3 flex gap-1  items-center justify-center text-center'>
                <div className=' text-amber-900'><FaPen/></div>
                <div className=' text-red-400'><FaTrashAlt/></div>
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={completedGoals.includes(goal.id)}
                  onChange={() => toggleGoal(goal.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCategoryGoal;