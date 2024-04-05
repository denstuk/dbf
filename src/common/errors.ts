export enum ExceptionCode {
    SYS001 = 'SYS001',
    DOC001 = 'DOC001',
    DOC002 = 'DOC002'
}

export class Exception extends Error {
    readonly code: ExceptionCode;

    constructor(code: ExceptionCode, message?: string) {
        super(message);
        this.code = code;
    }
}

export class UnableToReadFileException extends Exception {
    constructor(message: string) {
        super(ExceptionCode.SYS001, message);
    }
}

export class DockerNotInstalledException extends Exception {
    constructor() {
        super(ExceptionCode.DOC001, 'Docker not installed');
    }
}

export class DockerNotRunningException extends Exception {
    constructor() {
        super(ExceptionCode.DOC002, 'Docker is not running');
    }
}
