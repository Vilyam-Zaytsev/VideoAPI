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

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);
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

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

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

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the field "title" must be at least 1 character.',
                    field: 'title',
                },
            ],
        });
    });
    it('POST does not create the video with incorrect title (title is longer than 40 characters)', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfg',
                author: 'Vilyam',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the field "title" should not exceed 40 characters.',
                    field: 'title',
                },
            ],
        });
    });
    it('POST does not result in the creation of a video with an incorrect "author" field (the "author"field is missing)', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: undefined,
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The "author" field is required and cannot be empty.',
                    field: 'author',
                },
            ],
        });
    });
    it('POST does not result in the creation of a video with an incorrect "author" field (the "author" field contains less than 1 character).', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: '   ',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the "author" field must be at least 1 character.',
                    field: 'author',
                },
            ],
        });
    });
    it('POST does not lead to the creation of a video with an incorrect indication of the "author" field (the "author" field contains more than 20 characters).', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: 'qwertyuiopasdfghjklzx',
                availableResolutions: ["P144"]
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The length of the field "author" should not exceed 20 characters.',
                    field: 'author',
                },
            ],
        });
    });
    it('POST does not lead to the creation of a video with an incorrect indication of the "availableResolutions" field (the "availableResolutions" not array).', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: 'Vilyam',
                availableResolutions: "P144"
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The "availableResolutions" field contains invalid data.',
                    field: 'availableResolutions',
                },
            ],
        });
    });
    it('POST does not lead to the creation of a video with an incorrect indication of the "availableResolutions" field (available permissions" are an empty array).', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: 'Vilyam',
                availableResolutions: []
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The "availableResolutions" field contains invalid data.',
                    field: 'availableResolutions',
                },
            ],
        });
    });
    it('POST does not lead to the creation of a video with an incorrect indication of the "available permissions" field ("available permissions" contains incorrect values).', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: 'Vilyam',
                availableResolutions: ['P000', 'P111', 'P777']
            })
            .expect(400);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            errorsMessages: [
                {
                    message: 'The "availableResolutions" field contains invalid data.',
                    field: 'availableResolutions',
                },
            ],
        });
    });
    it('POST should be successful if all values are correct.', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: 'video1',
                author: 'Vilyam',
                availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]
            })
            .expect(201);

        console.log('Response Body:', res.body);
        console.log('Status Code:', res.status);

        expect(res.body).toEqual({
            id: expect.any(Number),
            title: 'video1',
            author: 'Vilyam',
            availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ],
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
        });

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [res.body]);

    });
})