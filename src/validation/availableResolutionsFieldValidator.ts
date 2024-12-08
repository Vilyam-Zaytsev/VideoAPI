import {ErrorsType} from "../types/errors-type";
import {Resolutions} from "../types/video-types";

const availableResolutionsFieldValidator = (
    availableResolutions: Resolutions[],
    errors: ErrorsType
) => {
    if (!Array.isArray(availableResolutions)
        || availableResolutions.length === 0
        || availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'The "availableResolutions" field contains invalid data.',
            field: 'availableResolutions'
        });

        return;
    }
};

export {availableResolutionsFieldValidator};