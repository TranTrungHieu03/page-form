"use client";
import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "../lib/utils";
import useDesigner from "./hooks/useDesigner";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import { idGenerator } from "./../lib/idGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignDropArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) {
        return;
      }
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElements = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElements);
      }
    },
  });
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
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full hap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground 
      hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn(
          "absolute   w-full h-1/2 rounded-t-md",
          topHalf.isOver && "bg-green-500"
        )}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(
          "absolute  w-full bottom-0 h-1/2 rounded-b-md",
          bottomHalf.isOver && "bg-red-500"
        )}
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={() => {
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2 animate-pulse ">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      <div className="flex w-full h-[120px] items-center px-4 py-2 pointer-events-none rounded-md bg-accent/40 ">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};
