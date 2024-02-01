import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddNewColumn = {
  boardId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type Board = {
  __typename?: "Board";
  columns?: Maybe<Array<Column>>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type BoardNew = {
  columns?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name: Scalars["String"]["input"];
};

export type Column = {
  __typename?: "Column";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: Scalars["Int"]["output"];
  tasks?: Maybe<Array<Task>>;
};

export type ColumnNew = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateTask = {
  columnId: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  subtasks?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type DragAndDropTask = {
  newLocation: DroppableColumn;
  prevLocation: DroppableColumn;
  taskId: Scalars["ID"]["input"];
};

export type DragAndDropTaskResponse = {
  __typename?: "DragAndDropTaskResponse";
  newColumn: Column;
  prevColumn: Column;
};

export type DroppableColumn = {
  columnId: Scalars["String"]["input"];
  position: Scalars["Int"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  checkSubtask: Subtask;
  createBoard: Board;
  createColumn: Column;
  createTask: Task;
  deleteBoard: Board;
  deleteColumn: Column;
  deleteTask: Task;
  dragAndDropTask: DragAndDropTaskResponse;
  updateBoard: Board;
  updateColumn: Column;
  updateTask: Task;
};

export type MutationCheckSubtaskArgs = {
  checkSubtask: CheckSubtask;
};

export type MutationCreateBoardArgs = {
  board: BoardNew;
};

export type MutationCreateColumnArgs = {
  column: AddNewColumn;
};

export type MutationCreateTaskArgs = {
  createTask: CreateTask;
};

export type MutationDeleteBoardArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteColumnArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDragAndDropTaskArgs = {
  dragAndDropTask: DragAndDropTask;
};

export type MutationUpdateBoardArgs = {
  updateBoard: UpdateBoard;
};

export type MutationUpdateColumnArgs = {
  updateColumn: UpdateColumn;
};

export type MutationUpdateTaskArgs = {
  updateTask: UpdateTask;
};

export type Query = {
  __typename?: "Query";
  getBoard: Board;
  getBoards: Array<Board>;
};

export type QueryGetBoardArgs = {
  id: Scalars["ID"]["input"];
};

export type Subtask = {
  __typename?: "Subtask";
  checked?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type SubtaskUpdate = {
  checked?: InputMaybe<Scalars["Boolean"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  subtaskId: Scalars["String"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Task = {
  __typename?: "Task";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  position?: Maybe<Scalars["Int"]["output"]>;
  subtasks?: Maybe<Array<Subtask>>;
  title: Scalars["String"]["output"];
};

export type UpdateBoard = {
  deletedColumns?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  newColumns?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oldColumns: Array<ColumnNew>;
};

export type UpdateColumn = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  position?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CheckSubtask = {
  checked: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type UpdateTask = {
  columnId: Scalars["ID"]["input"];
  deletedSubtasks?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  newSubtasks?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oldSubtasks: Array<SubtaskUpdate>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddNewColumn: AddNewColumn;
  Board: ResolverTypeWrapper<Board>;
  BoardNew: BoardNew;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Column: ResolverTypeWrapper<Column>;
  ColumnNew: ColumnNew;
  CreateTask: CreateTask;
  DragAndDropTask: DragAndDropTask;
  DragAndDropTaskResponse: ResolverTypeWrapper<DragAndDropTaskResponse>;
  DroppableColumn: DroppableColumn;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Subtask: ResolverTypeWrapper<Subtask>;
  SubtaskUpdate: SubtaskUpdate;
  Task: ResolverTypeWrapper<Task>;
  UpdateBoard: UpdateBoard;
  UpdateColumn: UpdateColumn;
  checkSubtask: CheckSubtask;
  updateTask: UpdateTask;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddNewColumn: AddNewColumn;
  Board: Board;
  BoardNew: BoardNew;
  Boolean: Scalars["Boolean"]["output"];
  Column: Column;
  ColumnNew: ColumnNew;
  CreateTask: CreateTask;
  DragAndDropTask: DragAndDropTask;
  DragAndDropTaskResponse: DragAndDropTaskResponse;
  DroppableColumn: DroppableColumn;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  Query: {};
  String: Scalars["String"]["output"];
  Subtask: Subtask;
  SubtaskUpdate: SubtaskUpdate;
  Task: Task;
  UpdateBoard: UpdateBoard;
  UpdateColumn: UpdateColumn;
  checkSubtask: CheckSubtask;
  updateTask: UpdateTask;
};

export type BoardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Board"] = ResolversParentTypes["Board"],
> = {
  columns?: Resolver<
    Maybe<Array<ResolversTypes["Column"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColumnResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Column"] = ResolversParentTypes["Column"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  position?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  tasks?: Resolver<
    Maybe<Array<ResolversTypes["Task"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DragAndDropTaskResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DragAndDropTaskResponse"] = ResolversParentTypes["DragAndDropTaskResponse"],
> = {
  newColumn?: Resolver<ResolversTypes["Column"], ParentType, ContextType>;
  prevColumn?: Resolver<ResolversTypes["Column"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  checkSubtask?: Resolver<
    ResolversTypes["Subtask"],
    ParentType,
    ContextType,
    RequireFields<MutationCheckSubtaskArgs, "checkSubtask">
  >;
  createBoard?: Resolver<
    ResolversTypes["Board"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBoardArgs, "board">
  >;
  createColumn?: Resolver<
    ResolversTypes["Column"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateColumnArgs, "column">
  >;
  createTask?: Resolver<
    ResolversTypes["Task"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskArgs, "createTask">
  >;
  deleteBoard?: Resolver<
    ResolversTypes["Board"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBoardArgs, "id">
  >;
  deleteColumn?: Resolver<
    ResolversTypes["Column"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteColumnArgs, "id">
  >;
  deleteTask?: Resolver<
    ResolversTypes["Task"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, "id">
  >;
  dragAndDropTask?: Resolver<
    ResolversTypes["DragAndDropTaskResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationDragAndDropTaskArgs, "dragAndDropTask">
  >;
  updateBoard?: Resolver<
    ResolversTypes["Board"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBoardArgs, "updateBoard">
  >;
  updateColumn?: Resolver<
    ResolversTypes["Column"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateColumnArgs, "updateColumn">
  >;
  updateTask?: Resolver<
    ResolversTypes["Task"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "updateTask">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  getBoard?: Resolver<
    ResolversTypes["Board"],
    ParentType,
    ContextType,
    RequireFields<QueryGetBoardArgs, "id">
  >;
  getBoards?: Resolver<Array<ResolversTypes["Board"]>, ParentType, ContextType>;
};

export type SubtaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subtask"] = ResolversParentTypes["Subtask"],
> = {
  checked?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Task"] = ResolversParentTypes["Task"],
> = {
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  subtasks?: Resolver<
    Maybe<Array<ResolversTypes["Subtask"]>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>;
  Column?: ColumnResolvers<ContextType>;
  DragAndDropTaskResponse?: DragAndDropTaskResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subtask?: SubtaskResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
};
