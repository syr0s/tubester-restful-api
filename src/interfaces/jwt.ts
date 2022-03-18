interface Jwt {
    /** Timestamp of the json web token */
    time: number;
    /** unique user id related to the json web token */
    uuid: string;
}

export default Jwt;