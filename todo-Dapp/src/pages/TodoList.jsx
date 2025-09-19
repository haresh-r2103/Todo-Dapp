import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import './Todo.css';
const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const CONTRACT_ADDRESS = "0x9bbfe99a7aee8afbf559c12f1765f4284aa79046";
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_task",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "updateTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllMyTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "task",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "done",
              "type": "bool"
            }
          ],
          "internalType": "struct Todo.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "yourTasks",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "task",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "done",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      loadTasks();
    }
  }, [user, navigate]);

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      const myAllTasks = await contract.getAllMyTasks();
      setTasks(myAllTasks);
    } catch (err) {
      console.error("Error loading tasks:", err);
      alert("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!task) return;
    setAdding(true);
    try {
      const contract = await getContract();
      const tx = await contract.addTask(task);
      await tx.wait();
      setTask("");
      loadTasks();
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateTask = async (id) => {
    setUpdating(id);
    try {
      const contract = await getContract();
      const tx = await contract.updateTask(id);
      await tx.wait();
      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    } finally {
      setUpdating(null);
    }
  };

  const deleteTask = async (id) => {
    setDeleting(id);
    try {
      const contract = await getContract();
      const tx = await contract.deleteTask(id);
      await tx.wait();
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    } finally {
      setDeleting(null);
    }
  };

  const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="todo-container">
      <div className="navbar">
        <div className="navbar-content">
          <h1>Todo-Dapp</h1>
          <div className="account-section">
            <span className="account-address">{shortenAddress(user)}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            disabled={adding}
          />
          <button 
            onClick={addTask} 
            disabled={adding || !task.trim()}
            className={adding ? "loading" : ""}
          >
            {adding ? "Adding..." : "Add Task"}
          </button>
        </div>

        <div className="tasks-section">
          <h2>Your Tasks</h2>
          {loading ? (
            <div className="loading-tasks">Loading tasks...</div>
          ) : (
            <div className="tasks-list">
              {tasks.length === 0 ? (
                <p className="no-tasks">No tasks found. Add a task to get started!</p>
              ) : (
                tasks.map((t) => (
                  <div key={t.id.toString()} className={`task-item ${t.done ? 'completed' : ''}`}>
                    <div className="task-content">
                      <span className="task-text">{t.task}</span>
                      {t.done && <span className="status-badge">Completed</span>}
                    </div>
                    <div className="task-actions">
                      {!t.done && (
                        <button 
                          onClick={() => updateTask(t.id)} 
                          disabled={updating === t.id}
                          className="done-btn"
                        >
                          {updating === t.id ? "Updating..." : "Mark Done"}
                        </button>
                      )}
                      <button 
                        onClick={() => deleteTask(t.id)} 
                        disabled={deleting === t.id}
                        className="delete-btn"
                      >
                        {deleting === t.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;