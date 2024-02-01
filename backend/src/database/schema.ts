import * as boardSchema from "./schema/boardModel";
import * as columnSchema from "./schema/columnModel";
import * as taskSchema from "./schema/taskModel";
import * as subtaskSchema from "./schema/subtaskModel";

export default {...boardSchema,...columnSchema,...taskSchema,...subtaskSchema}