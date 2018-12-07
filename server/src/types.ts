/**
 * @file Server Types
 * @author netcon <netcon@live.com>
 */

export interface Record {
    id: string | number;
    [key: string]: any;
}

export interface Table<T> {
    find: (id?: string | number) => T;
    findBy: (key: string, value: any) => T,
    select: () => T[];
    selectBy: (key: string, value: any) => T[];
    create: (record: T, generateId?: boolean) => T;
    update: (record: T) => T;
    delete: (record: T) => T;
}

export namespace Mock {
    export namespace Url {
        export enum Type {
            Path = 'path',
            Raw = 'raw',
            RegExp = 'regexp'
        }
    }

    export interface Url {
        type: Url.Type;
        value: string;
    }

    export enum Method {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE',
        HEAD = 'HEAD',
        OPTIONS = 'OPTIONS',
        PATCH = 'PATCH'
    }

    export namespace Response {
        export namespace Body {
            export enum Type {
                Raw = 'raw',
                Script = 'script'
            }
        }

        export interface Header {
            using: boolean;
            key: string;
            value: string;
        }

        export interface Body {
            type: Body.Type;
            raw: string;
            script: string;
        }
    }

    export interface Response {
        status: number;
        message: string;
        headers: Response.Header[];
        body: Response.Body;
    }
}

export interface Mock {
    id: string;
    name: string;
    running: boolean,
    url: Mock.Url,
    methods: Mock.Method[];
    response: Mock.Response;
}

export interface Controller {
    [event: string]: (...any: any[]) => any;
}
