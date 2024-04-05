type Fn<T> = () => T;
type AsyncFn<T> = () => Promise<T>;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async <T>(fn: Fn<T> | AsyncFn<T>, times: number, delay: number): Promise<T> => {
    let lastError: Error = new Error();

    for (let i = 0; i < times; i++) {
        try {
            return await fn();
        } catch (error: unknown) {
            lastError = error as Error;
            sleep(delay);
        }
    }

    throw lastError;
};

