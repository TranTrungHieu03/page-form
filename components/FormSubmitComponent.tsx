"use client"
import React, {useCallback, useRef, useTransition} from 'react';
import {FormElementInstance, FormElements} from "@/components/FormElements";
import {Button} from "@/components/ui/button";
import {HiCursorClick} from "react-icons/hi";

function FormSubmitComponent({formUrl, content}: {
    formUrl: string;
    content: FormElementInstance[];
}) {
    const [loading, startTransition] = useTransition()
    const formValues = useRef<{ [key: string]: string }>({})
    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value
    }, [])
    const submitForm = () => {
        console.log(formValues.current)
    }
    return (
        <div className={"flex justify-center w-full h-full  items-center p-8 "}>
            <div
                // key={renderKey}
                className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
            >
                {
                    content.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return <FormElement
                            key={element.id}
                            elementInstance={element}
                            submitValue={submitValue}
                        />
                    })
                }
                <Button
                    className="mt-8"
                    onClick={() => {
                        startTransition(submitForm);
                    }}
                    // disabled={pending}
                >
                    {/*{!pending && (*/}
                    <>
                        <HiCursorClick className="mr-2"/>
                        Submit
                    </>
                    {/*)}*/}
                    {/*{pending && <ImSpinner2 className="animate-spin"/>}*/}
                </Button>
            </div>
        </div>
    );
}

export default FormSubmitComponent;