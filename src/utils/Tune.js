import { generateRandomCode } from "./common";

export default class Tune {
    /**
     * Tune data
     * 
     * @param { String } name - Name of this tune.
     * @param { String } data - Sound data.
     * @param { String } id -  Tune id.
     */
    constructor(name, data, id) {
        this.name = name;
        this.data = data;

        // If id is not given, generate a random one.
        this.id = (!!id) ? id : generateRandomCode(24);
    }

    /**
     * Create a Tune instance from a given object.
     * 
     * @param { Object | String } obj - Json object or string
     * @returns { Tune }
     */
    static fromJson(obj) {
        if (typeof obj === "string") {
            obj = JSON.parse(obj);
        }

        return new Tune(obj?.name ?? "New Tune", obj?.data ?? "", obj?.id);
    }
}