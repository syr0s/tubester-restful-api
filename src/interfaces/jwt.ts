interface Jwt {
    /** Timestamp of the json web token */
    time: number;
    /** unique user id related to the json web token */
    uuid: string;
    /** The usergroup the user is part of */
    userGroup: number;
}

export default Jwt;