import React, { useContext } from 'react';
import inProgressIcon from '../../../../assets/in-progress-icon.png';
import completedIcon from '../../../../assets/completed-icon.png';

import './task.styles.css';

import { AuthContext } from '../../../../contexts/Auth.context.jsx';
import { TasksContext } from '../../../../contexts/Tasks.context';

import { updateTaskAction, deleteTaskAction } from '../../../../actions/tasks.actions';

const Task = (props) => {
    const authContextValue = useContext(AuthContext);
    const tasksContextValue = useContext(TasksContext);

    const handleUpdateTask = async () => {
        const updatedIsCompleted = !props.isCompleted;
        const data = {
            isCompleted: updatedIsCompleted,
        };

        try {
            const response = await fetch(`http://localhost:3000/tasks/${props.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status !== 202) {
                throw new Error();
            }

            const responseObj = await response.json();
            const lastUpdateAt = responseObj.data.updatedAt;
            console.log(responseObj.message);

            const action = updateTaskAction(props.index, updatedIsCompleted, lastUpdateAt);
            tasksContextValue.dispatchTasksState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleDeleteTask = async () => {
        const taskID = props.id;

        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;

            alert(message);

            const action = deleteTaskAction(taskID);
            tasksContextValue.dispatchTasksState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="task-container">
            <div className="task">
                <img
                    className={props.isCompleted ? 'done-icon' : 'status-icon'}
                    src={props.isCompleted ? completedIcon : inProgressIcon}
                    alt=""
                />
                <h3 className="task-title">{props.description}</h3>

                <div className="btn-container">
                    <button className="update-btn" id={props.isCompleted ? '' : 'completed'} onClick={handleUpdateTask}>
                        {props.isCompleted ? 'Reopen' : 'Done'}
                    </button>

                    <button className="delete-btn" onClick={handleDeleteTask}>
                        Delete
                    </button>
                </div>
            </div>
            <hr className="hr" />
            <div className="task-info">
                {props.createdAt ? `Created at: ${props.createdAt} .` : ''}&nbsp;
                {props.updatedAt ? `Last updated at: ${props.updatedAt}` : ''}
            </div>
        </div>
    );
};

export default Task;
