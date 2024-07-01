"use server";

import prisma from "@/lib/prisma";
import {formSchema, formSchemaType} from "@/schemas/form";
import {currentUser} from "@clerk/nextjs/server";


class UserNotFoundError extends Error {
    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFoundError";
    }
}

export async function GetFormStats() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        },
    });

    const visits = stats._sum?.visits || 0;
    const submissions = stats._sum?.submissions || 0;

    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;
    return {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    };
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Form not valid");
    }

    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name: data.name,
            description: data.description
        }
    })

    if (!form) {
        throw new Error("Form");
    }
    return form.id;
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }

    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const GetFormById = async (id: number) => {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }
    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })

}

export async function UpdateFormContent(id: number, jsonContent: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }
    return await prisma.form.update({
        where: {
            userId: user.id,
            id
        },
        data: {
            content: jsonContent
        }
    })
}

export async function PublishForm(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }
    return await prisma.form.update({
        data: {
            published: true
        }, where: {
            id,
            userId: user.id
        }
    })
}

export async function GetFormContentByUrl(url: string) {

    return await prisma.form.update({
        select: {content: true},
        data: {
            visits: {
                increment: 1
            }
        },
        where: {
            shareURL: url
        }
    })
}

export async function SubmitForm(formUrl: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {increment: 1},

            FormSubmission: {
                create: {
                    content
                }
            }
        },
        where: {
            shareURL: formUrl,
            published: true
        }
    })
}

export async function GetFormWithSubmisions(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }
    return await prisma.form.findUnique({
        where: {
            id
        },
        include: {
            FormSubmission: true
        }
    })
}