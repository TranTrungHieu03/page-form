"use client";

import {ElementsType, FormElement, FormElementInstance, SubmitFunction,} from "../FormElements";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form"
import {Switch} from "@/components/ui/switch";
import {cn} from "@/lib/utils";
import {BsFillCalendar2DateFill} from "react-icons/bs";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,

};
const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),


})

export const DateFieldFormElement: FormElement = {
    type,
    construct:
        (id: string) => ({
            id,
            type,
            extraAttributes,
        }),
    designerBtnElement: {
        icon: BsFillCalendar2DateFill,
        label: "Date Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance
        if (element.extraAttributes.required) {
            return currentValue.length > 0
        }
        return true
    },
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
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,

        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label: values.label,
                helperText: values.helperText,
                required: values.required,

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
                name="label"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input {...field}
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

            <FormField
                control={form.control}
                name="helperText"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Helper Text</FormLabel>
                        <FormControl>
                            <Input {...field}
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") e.currentTarget.blur()
                                   }}/>
                        </FormControl>
                        <FormDescription>
                            The helper text of the field <br/> It will be display below the field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="required"
                render={({field}) => (
                    <FormItem className={"flex items-center justify-between rounded-lg border -top-2/3 shadow-sm p-2"}>
                        <div className={"space-y-0.5"}>
                            <FormLabel>Required</FormLabel>

                            <FormDescription>
                                The label of the field <br/> It will be display above the field
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange}/>
                        </FormControl>
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
    const {label, required, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Label className="text-black dark:text-white">
                {label}
                {required && "*"}
            </Label>
            <Button variant={"outline"} className={"w-full justify-start text-left font-normal"}>
                <CalendarIcon className="h-4 w-4 mr-2"/>
                <span>Pick a date</span>
            </Button>
            {helperText && <p className="text-muted-foreground text-[0.8rem]"> {helperText}</p>}
        </div>
    );
}

function FormComponent({
                           elementInstance,
                           submitValue,
                           isInvalid,
                           defaultValues
                       }: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean,
    defaultValues?: string
}) {
    const element = elementInstance as CustomInstance;
    const [date, setDate] = useState<Date | undefined>(defaultValues ? new Date(defaultValues) : undefined)
    const [error, setError] = useState(false);
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);
    const {label, required, placeHolder, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Label className={cn("text-black dark:text-white", error && "text-red-500")}>
                {label}
                {required && "*"}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        error && "border-red-500")}>
                        <CalendarIcon className="h-4 w-4 mr-2"/>
                        {date ? format(date, "PPP") :
                            <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={"w-auto p-0 "} align={"start"}>
                    <Calendar
                        mode={"single"}
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            if (!submitValue) return;
                            const value = date?.toUTCString() || "";
                            const valid = DateFieldFormElement.validate(element, value)
                            setError(!valid);
                            submitValue(element.id, value);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {helperText &&
                <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}> {helperText}</p>}
        </div>
    );
}