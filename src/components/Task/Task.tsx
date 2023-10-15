"use client";

import { Todo } from "@/types/Todo";
import IconButton from "../IconButton/IcontButton";
import "./Task.scss";

type Props = {
	task: Todo;
	refreshTodoListFunction: (userId: string) => void;
};

export default function Task({ task, refreshTodoListFunction }: Props) {
	const toggleCompleted = async (completed: boolean) => {
		fetch(`/api/todo/${task.id}/completed`, {
			method: "PUT",
			body: JSON.stringify(completed),
		}).then(() => refreshTodoListFunction(task.userId));
	};

	const handleDeleteTask = async (taskId: string) => {
		fetch(`/api/todo/${taskId}`, {
			method: "DELETE",
		}).then(() => refreshTodoListFunction(task.userId));
	};

	return (
		<article className={"task-card" + (task.completed ? " completed" : "")}>
			<input id={`Completed__${task.id}`} type="checkbox" className="checkbox" defaultChecked={task.completed} onChange={(e) => toggleCompleted(e.target.checked)} />
			<div className="task-info">
				<p className="task-info__due-date">{new Date(task.dueOn).toISOString().slice(0, 10)}</p>
				<p className="task-info__title">{task.title}</p>
			</div>
			{task.completed == false && <IconButton actionType="delete" actionFunction={() => handleDeleteTask(task.id!)} />}
		</article>
	);
}
