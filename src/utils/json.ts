type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

type JSONArray = Array<JSONValue>;

interface JSONObject {
    [key: string]: JSONValue;
}

function jsonParse(jsonString: string): JSONObject {
    return JSON.parse(jsonString) as JSONObject;
}

export type { JSONObject, JSONValue };
export { jsonParse };
