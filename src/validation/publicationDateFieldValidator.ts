import {ErrorsType} from "../types/errors-type";

const publicationDateFieldValidator = (
    publicationDate: string,
    errors: ErrorsType
) => {
    const date = new Date(publicationDate);

    if (isNaN(date.getTime()) || date > new Date()) {
        errors.errorsMessages.push({
            message: 'Invalid date value.',
            field: 'publicationDate'
        });

        return;
    }

    if (publicationDate !== date.toISOString()) {
        errors.errorsMessages.push({
            message: 'Incorrect date format.',
            field: 'publicationDate'
        });

        return;
    }

};

export {publicationDateFieldValidator};