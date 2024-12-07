import {ErrorsType} from "../types/errors-type";

const canBeDownloadedValidator = (
    canBeDownloaded: boolean,
    errors: ErrorsType
) => {
    if (typeof canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'The "canBeDownloaded" field must contain a boolean value.',
            field: 'canBeDownloaded'
        });

        return;
    }
};

export {canBeDownloadedValidator};