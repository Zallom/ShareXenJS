interface GlobalError {
    err: boolean,
    endpoint: string,
    code: number,
    is_admin?: boolean
    error: string,
    exists?: boolean
    time: number

    // Properties that *can* be returned but never will be in this situation
    url?: never,
    deletion_url?: never,
    key?: never,
    iterations?: never,
    filename?: never,
    method?: never,
    old_name?: never,
    new_name?: never,
    filesize?: never,
    uploaded_time?: never,
    endpoints?: never,
    keyspace?: never,
    name_length?: never,
    allowed_extensions?: never,
    allowed_characters?: never,
    custom_names?: never,
    files_count?: never,
    files?: never
}

interface Response {
    err: boolean,
    api_version: string,
    endpoint: string,
    code: number,
    time: number
}

interface UploadResponse extends Response {
    url: string,
    deletion_url: string,
    key: string,
    iterations: number,
}

interface DeletionResponse extends Response {
    filename: string,
    method: string
}

interface RenameResponse extends Response {
    old_name: string,
    new_name: string,
    url: string,
    deletion_url: string,
    key: string,
    iterations: number
}

interface InfoResponse extends Response {
    is_admin: boolean,
    filename: string,
    filesize: number,
    url: string,
    deletion_url: string,
    key: string,
    exists: number,
    uploaded_time: number
}

interface GlobalInfoResponse extends Response {
    is_admin: boolean,
    endpoints: string[],
    keyspace: string,
    name_length: number,
    allowed_extensions: string[],
    allowed_characters: string[],
    custom_names: boolean,
    files_count: number,
    files: string[]
}


export default class ShareXenJS {
    token: string;
    dest: string;

    login(dest: string, token: string): void;
    upload(): GlobalError;
    upload(file: string | Buffer): UploadResponse;
    delete(): GlobalError
    delete(file: string): DeletionResponse;
    rename(): GlobalError;
    rename(file: String): GlobalError;
    rename(newfilename: String): GlobalError;
    rename(file: string, newfilename: string): RenameResponse;
    info(): GlobalInfoResponse
    info(file: string): InfoResponse
}