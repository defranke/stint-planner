
export function round(value: number, decimals: number) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}