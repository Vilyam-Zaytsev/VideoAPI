import {ErrorsType} from "../types/errors-type";

const titleFieldValidator = (
    title: string | undefined,
    errors: ErrorsType
) => {
    if (!title) {
        errors.errorsMessages.push({
            message: 'The "title" field is required and cannot be empty.',
            field: 'title'
        });

        return;
    }

    if (title && title.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'The length of the header must be at least 1 character',
            field: 'title'
        });

        return;
    }

    if (title && title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'The length of the header should not exceed 40 characters',
            field: 'title'
        });

        return;
    }
};

export {titleFieldValidator};