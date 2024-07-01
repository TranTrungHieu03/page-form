"use client";

import {MdTextFields} from "react-icons/md";
import {ElementsType, FormElement, FormElementInstance,} from "../FormElements";
import {Label} from "../ui/label";
import {Input} from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "TextField",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here ...",
};

export const TextFieldFormElement: FormElement = {
    type,
    construct:
        (id: string) => ({
            id,
            type,
            extraAttributes,
        }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "TextField",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: PropertiesComponent
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({elementInstance}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance
    return <div>Form properties for {element.extraAttributes.label}</div>
}

function DesignerComponent({
                               elementInstance,
                           }: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const {label, required, placeHolder, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col gap- w-2full ">
            <Label className="text-black dark:text-white">
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder}/>
            {helperText && <p className="text-muted-foreground text-[0.8rem]"> {helperText}</p>}
        </div>
    );
}
