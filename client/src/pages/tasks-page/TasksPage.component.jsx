import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tasks-page.styles.css';
import environments from '../../environments/environments';

import { AuthContext } from '../../contexts/Auth.context';
import { TasksContext } from '../../contexts/Tasks.context';

import { initTasksAction } from '../../actions/tasks.actions';

import Loader from '../../components/shared/loader/Loader.component';
import AddTasksForm from './add-tasks-form/AddTasksForm.component';
import TasksContainer from './tasks-container/TasksContainer.component';

const API_URL = environments.API_URL;

const TasksPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);
    const tasksContextValue = useContext(TasksContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch(`${API_URL}/tasks`, {
                    headers: {
                        'Authorization': `Bearer ${authContextValue.userToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const tasks = responseObj.data.tasks;

                const action = initTasksAction(tasks);
                tasksContextValue.dispatchTasksState(action);

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                alert('Something went wrong!');

                navigate('*');
            }
        };

        if (authContextValue.userToken == null) {
            navigate('/login');
            return;
        }

        getTasks();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="tasks-page">
            <AddTasksForm />

            <TasksContainer />
        </main>
    );
};

export default TasksPage;
