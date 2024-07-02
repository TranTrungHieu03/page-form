"use client";

import {ElementsType, FormElement, FormElementInstance, SubmitFunction,} from "../FormElements";
import {Label} from "../ui/label";
import z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form"
import {BsTextParagraph} from "react-icons/bs";
import {Textarea} from "@/components/ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
    text: "Text here",

};
const propertiesSchema = z.object({
    text: z.string().min(2).max(500),

})

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct:
        (id: string) => ({
            id,
            type,
            extraAttributes,
        }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({elementInstance}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance
    const {updateElement} = useDesigner()
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            text: element.extraAttributes.title,

        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text: values.text,

            }
        })
    }

    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3"
              onSubmit={(e) => {
                  e.preventDefault()
              }}>
            <FormField
                control={form.control}
                name="text"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Textarea
                                rows={5}
                                {...field}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur()
                                }}/>
                        </FormControl>
                        <FormDescription>
                            The label of the field <br/> It will be display above the field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />

        </form>
    </Form>)
}

function DesignerComponent({
                               elementInstance,
                           }: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const {text} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Label className="text-black dark:text-white">
                Paragraph field
            </Label>
            <p className={"text-base"}>{text}</p>

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
    const element = elementInstance as CustomInstance;

    const {text} = element.extraAttributes;
    return (
        <p className={"text-base"}>{text}</p>
    );
}