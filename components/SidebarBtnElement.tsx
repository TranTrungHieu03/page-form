import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      isDesignerBtnElement: true,
      type: formElement.type,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      value={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-gap",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-slate-300 cursor-grab" />
      <p className="text-xs ">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;

export const SidebarBtnElementOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      value={"outline"}
      className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-gap")}
    >
      <Icon className="h-8 w-8 text-slate-300 cursor-grab" />
      <p className="text-xs ">{label}</p>
    </Button>
  );
};
