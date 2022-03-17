/**
 * Checks if a given `number` is in a given range.
 * @param int the `number`you want to look up if in range
 * @param min the minimum `number` in range
 * @param max the maximum `number` in range
 * @returns boolean
 */
export function between(int: number, min: number, max: number): boolean {
    if (int >= min && int <= max) {
        return true;
    }
    return false;
}