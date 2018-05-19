import * as JsonSchema from "./JsonSchemaProperty";
export * from "./JsonSchemaProperty";

export const withOptional = (srcSchema: JsonSchema.Property) => {
    if (srcSchema.type === "object") {
        const newSchema: JsonSchema.ObjectProperty & {required: string[]} =
            {...srcSchema, properties: {}, required: []}; // tslint:disable-line one-line
        for (const name of Object.keys(srcSchema.properties)) {
            newSchema.properties[name] = withOptional(srcSchema.properties[name]);
            const prop = newSchema.properties[name];
            if (!prop.optional) {
                newSchema.required.push(name);
                if (prop.enum) prop.default = prop.enum[0];
            }
        }

        return newSchema;
    } else if (srcSchema.type === "array") {
        const newSchema: JsonSchema.ArrayProperty = {...srcSchema};
        newSchema.items = withOptional(srcSchema.items);

        return newSchema;
    } else {
        return {...srcSchema};
    }
};
