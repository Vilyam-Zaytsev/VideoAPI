import {ErrorsType} from "../types/errors-type";

const minAgeRestrictionFieldValidator = (
    minAgeRestriction: number,
    errors: ErrorsType
) => {
    if (minAgeRestriction === null) return;

    if (typeof minAgeRestriction !== 'number') {
        errors.errorsMessages.push({
            message: 'The "minAgeRestriction" field must contain a number.',
            field: 'minAgeRestriction'
        });

        return;
    }

    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errors.errorsMessages.push({
            message: 'The "minimum age limit" field must be in the range from 1 to 18.',
            field: 'minAgeRestriction'
        });

        return;
    }
};

export {minAgeRestrictionFieldValidator};