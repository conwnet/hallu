export const Mock = {
    Status: {
        Running: 1,
        Suspended: 0
    },
    Url: {
        Type: {
            Path: 'path',
            Raw: 'raw',
            RegExp: 'regexp'
        }
    },
    Method: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        HEAD: 'HEAD',
        OPTIONS: 'OPTIONS',
        PATCH: 'PATCH'
    },
    Response: {
        Body: {
            Type: {
                Raw: 'raw',
                Script: 'script'
            }
        }
    }
};
