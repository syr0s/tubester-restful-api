/**
 * Takes a string and lookup if it is 'true' or 'false'.
 * This function is used to process environment variables.
 * @param string 
 * @returns true if string is 'true'
 */
export function toBoolean(string: string | undefined): boolean {
    if (string) {
        if (string == 'true') {
            return true;
        }
    }
    return false;
}