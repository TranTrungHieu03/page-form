import React from "react";
import {Button} from "./ui/button";
import {MdPreview} from "react-icons/md";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import useDesigner from "@/components/hooks/useDesigner";
import {FormElements} from "@/components/FormElements";

const PreViewDialogBtn = () => {
    const {elements} = useDesigner()
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"outline"} className="gap-2">
                    <MdPreview className="h-6 w-6 "/>
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className={"h-screen w-screen max-h-screen max-w-screen flex flex-col flex-grow p-0 gap-0"}>
                <div className={"px-4 py-2 border-b"}>
                    <p className={"text-lg font-bold text-muted-foreground"}>Form Preview</p>

                    <p className={"text-sm text-muted-foreground"}>This is how your form will look like to your
                        users</p></div>

                <div
                    className={"bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto"}>
                    <div
                        className={"max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto"}>
                        {
                            elements.map((el) => {
                                const FormComponent = FormElements[el.type].formComponent;
                                return <FormComponent elementInstance={el} key={el.id}/>

                            })
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default PreViewDialogBtn;
