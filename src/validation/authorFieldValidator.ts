import {ErrorsType} from "../types/errors-type";

const authorFieldValidator = (
    author: string | undefined,
    errors: ErrorsType
) => {
    if (!author) {
        errors.errorsMessages.push({
            message: 'The "author" field is required and cannot be empty.',
            field: 'author'
        });

        return;
    }

    if (author && author.trim().length < 1) {
        errors.errorsMessages.push({
            message: 'The length of the "author" field must be at least 1 character.',
            field: 'author'
        });

        return;
    }

    if (author && author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'The length of the field "author" should not exceed 20 characters.',
            field: 'author'
        });

        return;
    }
};

export {authorFieldValidator};