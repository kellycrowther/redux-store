// action constants
export const ADD_TODO = '[Todo] Add Todo';

// action creators
export class AddTodo {
    readonly type = ADD_TODO;
    constructor(private payload: any) {}
}

// console.info('TODO: ', new AddTodo({}))
