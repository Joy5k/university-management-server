import { z } from "zod";

const createSemesterRegistrationValidation = z.object({
    body:z.object({})
})

export const semesterRegistration = {
    createSemesterRegistrationValidation
}