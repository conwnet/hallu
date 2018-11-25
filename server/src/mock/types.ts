export interface Mock {
    id: string,
    name: string,
    running: boolean,
    url: {type: string, value: string},
    methods: string[],
    status: {code: number, message: string},
    headers: {key: string, value: string, status: boolean}[],
    body: {type: string, value: string}
}
