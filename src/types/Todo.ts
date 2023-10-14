export interface Todo {
	id?: string;
	title: string;
	completed?: boolean;
	dueOn: Date;
	userId: string;
	plantId: string;
}
