let RUN_ID: string;

export const setRunId = (id: string) => {
    RUN_ID = id;
};

export const getRunId = (): string => {
    if (!RUN_ID) {
        throw new Error("RUN_ID not initialized");
    }
    return RUN_ID;
};