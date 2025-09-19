// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo {

    struct Task {
        uint id;
        string task;
        bool done;
    }

    mapping(address => Task[]) public yourTasks;
    
    // Add a new task
    function addTask(string memory _task) public {
        uint id = yourTasks[msg.sender].length + 1; // taskId starts from 1
        yourTasks[msg.sender].push(Task(id, _task, false));
    }

    // Mark task as done
    function updateTask(uint _id) public {
        require(_id > 0 && _id <= yourTasks[msg.sender].length, "Invalid task id");
        Task storage t = yourTasks[msg.sender][_id - 1]; 
        t.done = true;
    }

    // Delete a task (swap & pop for gas efficiency)
    function deleteTask(uint _id) public {
        require(_id > 0 && _id <= yourTasks[msg.sender].length, "Invalid task id");
        uint index = _id - 1;
        uint lastIndex = yourTasks[msg.sender].length - 1;

        if (index != lastIndex) {
            yourTasks[msg.sender][index] = yourTasks[msg.sender][lastIndex];
            yourTasks[msg.sender][index].id = _id; // preserve id consistency
        }

        yourTasks[msg.sender].pop();
    }

    // Get all my tasks
    function getAllMyTasks() public view returns(Task[] memory) {
        return yourTasks[msg.sender];
    }
}
