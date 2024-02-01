import { and, eq, gt, gte, lt, lte, sql } from "drizzle-orm";
import db from "../database/config";
import { task } from "../database/schema/taskModel";
import { TaskDnDPayload } from "./type";
import { DBColumn, column } from "../database/schema/columnModel";
import { BadRequest } from "./errorHandler";

export const dragAndDropTask = async (taskDnDPayload: TaskDnDPayload) => {
  const { taskId, prevLocation, newLocation } = taskDnDPayload;

  if (prevLocation.columnId == newLocation.columnId) {
    // move task on same column
    if (prevLocation.position > newLocation.position) {
      // task was moved up on same column
      await moveTaskUpOnSameColumn(taskDnDPayload);
    }
    if (prevLocation.position < newLocation.position) {
      // task was move down on same column
      await moveTaskDownOnSameColumn(taskDnDPayload);
    }
    const prevColumn = await db.query.column.findFirst({
      where: eq(column.id, prevLocation.columnId),
    }) as DBColumn;
    return {
      prevColumn,
      newColumn: prevColumn,
    };
  }

  // move ot different column
  await moveTaskToDiffColumn(taskDnDPayload);
  const prevColumn = await db.query.column.findFirst({
    where: eq(column.id, prevLocation.columnId),
  }) as DBColumn;
  const newColumn = await db.query.column.findFirst({
    where: eq(column.id, newLocation.columnId),
  }) as DBColumn;
  return {
    prevColumn,
    newColumn,
  };
};

const moveTaskUpOnSameColumn = async (taskDnDPayload: TaskDnDPayload) => {
  const { taskId, prevLocation, newLocation } = taskDnDPayload;
  await db
    .update(task)
    .set({
      position: sql`${task.position}+1`,
    })
    .where(
      and(
        eq(task.columnId, prevLocation.columnId),
        gte(task.position, newLocation.position),
        lt(task.position, prevLocation.position)
      )
    );

  await db
    .update(task)
    .set({
      position: newLocation.position,
    })
    .where(eq(task.id, taskId));
};

const moveTaskDownOnSameColumn = async (taskDnDPayload: TaskDnDPayload) => {
  const { taskId, prevLocation, newLocation } = taskDnDPayload;
  await db
    .update(task)
    .set({
      position: sql`${task.position}-1`,
    })
    .where(
      and(
        eq(task.columnId, prevLocation.columnId),
        gt(task.position, prevLocation.position),
        lte(task.position, newLocation.position)
      )
    );

  await db
    .update(task)
    .set({
      position: newLocation.position,
    })
    .where(eq(task.id, taskId));
};

const moveTaskToDiffColumn = async (taskDnDPayload: TaskDnDPayload) => {
  const { taskId, prevLocation, newLocation } = taskDnDPayload;
  await db
    .update(task)
    .set({
      position: sql`${task.position}-1`,
    })
    .where(
      and(
        eq(task.columnId, prevLocation.columnId),
        gt(task.position, prevLocation.position)
      )
    );

  await db
    .update(task)
    .set({
      position: sql`${task.position}+1`,
    })
    .where(
      and(
        eq(task.columnId, newLocation.columnId),
        gte(task.position, newLocation.position)
      )
    );

  await db
    .update(task)
    .set({
      position: newLocation.position,
      columnId: newLocation.columnId,
    })
    .where(eq(task.id, taskId));
};
