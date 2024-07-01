import React from "react";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";
import useDesigner from "@/components/hooks/useDesigner";
import FormElementsSidebar from "@/components/FormElementsSidebar";
import PropertiesFormSidebar from "@/components/PropertiesFormSidebar";

const DesignerSidebar = () => {
    const {selectedElement} = useDesigner()
  return (
    <aside className="w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
        {!selectedElement && (<FormElementsSidebar/>)}
        {
            selectedElement && (<PropertiesFormSidebar/>)
        }
    </aside>
  );
};

export default DesignerSidebar;
