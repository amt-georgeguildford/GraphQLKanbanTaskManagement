/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateBoard($board: BoardNew!) {\n  createBoard(board: $board) {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n": types.CreateBoardDocument,
    "\n    mutation CreateColumn($column: AddNewColumn!) {\n  createColumn(column: $column) {\n    id\n    name  \n  }\n}\n": types.CreateColumnDocument,
    "\n    mutation CreateTask($createTask: CreateTask!) {\n  createTask(createTask: $createTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id\n      title\n      checked\n    }\n  }\n}\n": types.CreateTaskDocument,
    "\n    mutation UpdateBoard($updateBoard: UpdateBoard!) {\n  updateBoard(updateBoard: $updateBoard) {\n    id\n    name,\n  }\n}\n": types.UpdateBoardDocument,
    "\n    mutation UpdateTask($updateTask: updateTask!) {\n  updateTask(updateTask: $updateTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id,\n      title,\n      checked\n    }\n  }\n}\n": types.UpdateTaskDocument,
    "\n    mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}\n": types.DeleteBoardDocument,
    "\n    query GetBoards {\n  getBoards {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n": types.GetBoardsDocument,
    "\n    mutation DeleteTask($deleteTaskId: ID!) {\n  deleteTask(id: $deleteTaskId) {\n    id\n    title\n    description\n    position\n  }\n}\n": types.DeleteTaskDocument,
    "\n    mutation CheckSubtask($checkSubtask: checkSubtask!) {\n  checkSubtask(checkSubtask: $checkSubtask) {\n    id\n    title\n    checked\n  }\n}\n": types.CheckSubtaskDocument,
    "\n    query GetBoard($getBoardId: ID!) {\n  getBoard(id: $getBoardId) {\n    id\n    name\n    columns {\n      id\n      name, position,\n      tasks {\n        id,\n        title,\n        position,\n        description\n        subtasks {\n          id\n          title\n          checked\n        }\n      }\n    }\n  }\n}\n": types.GetBoardDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateBoard($board: BoardNew!) {\n  createBoard(board: $board) {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\n    mutation CreateBoard($board: BoardNew!) {\n  createBoard(board: $board) {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateColumn($column: AddNewColumn!) {\n  createColumn(column: $column) {\n    id\n    name  \n  }\n}\n"): (typeof documents)["\n    mutation CreateColumn($column: AddNewColumn!) {\n  createColumn(column: $column) {\n    id\n    name  \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateTask($createTask: CreateTask!) {\n  createTask(createTask: $createTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id\n      title\n      checked\n    }\n  }\n}\n"): (typeof documents)["\n    mutation CreateTask($createTask: CreateTask!) {\n  createTask(createTask: $createTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id\n      title\n      checked\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateBoard($updateBoard: UpdateBoard!) {\n  updateBoard(updateBoard: $updateBoard) {\n    id\n    name,\n  }\n}\n"): (typeof documents)["\n    mutation UpdateBoard($updateBoard: UpdateBoard!) {\n  updateBoard(updateBoard: $updateBoard) {\n    id\n    name,\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateTask($updateTask: updateTask!) {\n  updateTask(updateTask: $updateTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id,\n      title,\n      checked\n    }\n  }\n}\n"): (typeof documents)["\n    mutation UpdateTask($updateTask: updateTask!) {\n  updateTask(updateTask: $updateTask) {\n    id\n    title\n    description\n    position\n    subtasks {\n      id,\n      title,\n      checked\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\n    mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetBoards {\n  getBoards {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\n    query GetBoards {\n  getBoards {\n    id\n    name\n    columns {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteTask($deleteTaskId: ID!) {\n  deleteTask(id: $deleteTaskId) {\n    id\n    title\n    description\n    position\n  }\n}\n"): (typeof documents)["\n    mutation DeleteTask($deleteTaskId: ID!) {\n  deleteTask(id: $deleteTaskId) {\n    id\n    title\n    description\n    position\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CheckSubtask($checkSubtask: checkSubtask!) {\n  checkSubtask(checkSubtask: $checkSubtask) {\n    id\n    title\n    checked\n  }\n}\n"): (typeof documents)["\n    mutation CheckSubtask($checkSubtask: checkSubtask!) {\n  checkSubtask(checkSubtask: $checkSubtask) {\n    id\n    title\n    checked\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetBoard($getBoardId: ID!) {\n  getBoard(id: $getBoardId) {\n    id\n    name\n    columns {\n      id\n      name, position,\n      tasks {\n        id,\n        title,\n        position,\n        description\n        subtasks {\n          id\n          title\n          checked\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\n    query GetBoard($getBoardId: ID!) {\n  getBoard(id: $getBoardId) {\n    id\n    name\n    columns {\n      id\n      name, position,\n      tasks {\n        id,\n        title,\n        position,\n        description\n        subtasks {\n          id\n          title\n          checked\n        }\n      }\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;