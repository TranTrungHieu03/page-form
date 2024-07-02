"use client";

import {ElementsType, FormElement, FormElementInstance, SubmitFunction,} from "../FormElements";
import {Label} from "../ui/label";
import {Separator} from "@/components/ui/separator";
import {RiSeparator} from "react-icons/ri";

const type: ElementsType = "SeparatorField";

const extraAttributes = {
    title: "Separator Field",

};
export const SeparatorFieldFormElement: FormElement = {
    type,
    construct:
        (id: string) => ({
            id,
            type,
            extraAttributes,
        }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};

function PropertiesComponent({elementInstance}: {
    elementInstance: FormElementInstance;
}) {

    return <p>No properties for this element</p>
}

function DesignerComponent({
                               elementInstance,
                           }: {
    elementInstance: FormElementInstance;
}) {
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Label className="text-black dark:text-white">
                Separator field
            </Label>
            <Separator/>

        </div>
    );
}

function FormComponent({
                           elementInstance,
                           submitValue,

                       }: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;

}) {

    return (
        <Separator/>
    );
}