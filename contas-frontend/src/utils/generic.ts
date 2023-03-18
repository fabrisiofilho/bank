export function getProps<T>(keys: string[], value: T) {
    for (const key of keys) {
        value = value[key];
    }
    return value;
}   