import React, { useContext } from 'react';
import { formateDate } from '../../../utils/date.utils.js';
import './tasks-container.styles.css';

import { TasksContext } from '../../../contexts/Tasks.context';

import Task from './task/Task.component';

const TasksContainer = () => {
    const tasksContextValue = useContext(TasksContext);

    return (
        <ul className="tasks-container">
            {tasksContextValue.tasksState.length === 0 ? (
                <div className="empty-list">Your list is empty</div>
            ) : (
                tasksContextValue.tasksState.map((task, index) => {
                    return (
                        <Task
                            id={task._id}
                            description={task.description}
                            isCompleted={task.isCompleted}
                            createdAt={task.createdAt ? formateDate(new Date(task.createdAt)) : null}
                            updatedAt={task.updatedAt ? formateDate(new Date(task.updatedAt)) : null}
                            index={index}
                        />
                    );
                })
            )}
        </ul>
    );
};

export default TasksContainer;
