"use client";
import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "../lib/utils";
import useDesigner from "./hooks/useDesigner";

const Designer = () => {
 const {elements, addElement} = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignDropArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) =>  {
      console.log(event);
      
    }
  })
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full ">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-x-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {droppable.isOver ? (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          ) : (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
