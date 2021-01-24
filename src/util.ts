
export const getDefault = (currentValue: any, defaultValue: any) => {
    if (currentValue === undefined || currentValue === null) {
        return defaultValue;
    }
    return currentValue;
}