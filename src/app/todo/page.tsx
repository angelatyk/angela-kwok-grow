"use client";

import Task from "@/components/Task/Task";
import { Todo } from "@/types/Todo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./todo.scss";

export default function TodoList() {
	const { data: session } = useSession();
	const userId = session?.user.id;
	const [todoList, setTodoList] = useState<Todo[] | null>(null);

	useEffect(() => {
		if (userId) {
			getTodoList(userId);
		}
	}, [userId]);

	const getTodoList = (userId: string) => {
		fetch(`/api/user/${userId}/todos`)
			.then((res) => res.json())
			.then((data) => {
				const notCompletedList = data.filter((task: Todo) => !task.completed).sort((a: Todo, b: Todo) => new Date(a.dueOn).getTime() - new Date(b.dueOn).getTime());
				const completedList = data.filter((task: Todo) => task.completed).sort((a: Todo, b: Todo) => new Date(b.dueOn).getTime() - new Date(a.dueOn).getTime());
				setTodoList([...notCompletedList, ...completedList]);
			})
			.catch((error) => {
				throw new Error(`There was an issue retriving todos for the user: ${error}`);
			});
	};

	return (
		<>
			<main>
				<h1 className="headline-padding">Todo List</h1>
				{userId && <div className="todo-list">{todoList && todoList.map((task: Todo) => <Task key={task.id} task={task} refreshTodoListFunction={getTodoList} />)}</div>}
			</main>
		</>
	);
}
