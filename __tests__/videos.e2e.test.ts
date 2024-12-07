import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import {ErrorsType} from "../src/types/errors-type";

describe('/videos', () => {

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, []);

        console.log(res.body);
    });
    it('POST does not create the video with incorrect title (no title)', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: undefined,
                author: 'Vilyam',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log(res.body);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The "title" field is required and cannot be empty.',
                    field: 'title',
                },
            ],
        });
    });
    it('POST does not lead to the creation of a video with an incorrect title (title is less than 1 character)', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: '   ',
                author: 'Vilyam',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log(res.body);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the header must be at least 1 character',
                    field: 'title',
                },
            ],
        });
    });
    it('POST does not create the video with incorrect title (title is longer than 40 characters)', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'dcjdjdjjeciewcewkjkewjkewjkeckeckeckeckeckwckcwekcmwecm',
                author: 'Vilyam',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log(res.body);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the header should not exceed 40 characters',
                    field: 'title',
                },
            ],
        });
    });
    // it('PUBLISHING does not lead to the creation of a video with an incorrect "author" field (there is no author field or it consists only of spaces)', async () => {
    //     const res = await req
    //         .post(SETTINGS.PATH.VIDEOS)
    //         .send({
    //             title: 'video1',
    //             author: '   ',
    //             availableResolutions: ["P144"]
    //         })
    //         .expect(400);
    //
    //     console.log(res.body);
    //
    //     expect(res.body).toEqual({
    //         errorsMessages: [
    //             {
    //                 message: 'The length of the header should not exceed 40 characters',
    //                 field: 'title',
    //             },
    //         ],
    //     });
    // });
})