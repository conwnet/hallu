/**
 * @file Server Types
 * @author netcon <netcon@live.com>
 */

export interface Record {
    id: string | number;
    [key: string]: any;
}

export interface Table<T> {
    select: () => T[];
    create: (record: T) => T;
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

    export enum Status {
        Running = 1,
        Suspended = 0
    }

    export namespace Response {
        export namespace Body {
            export enum Type {
                Raw = 'raw',
                Script = 'script'
            }
        }

        export interface Header {
            used: boolean;
            key: string;
            value: string;
        }

        export interface Body {
            type: Body.Type;
            value: string;
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
    status: Mock.Status;
    url: Mock.Url,
    methods: Mock.Method[];
    response: Mock.Response;
}

export interface Controller {
    [event: string]: (...any: any[]) => any;
}
