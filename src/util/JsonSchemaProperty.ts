export type Property =
    StringProperty |
    NumberProperty |
    BooleanProperty |
    ArrayProperty |
    ObjectProperty;

export interface PropertyBase {
    title?: string;
    optional?: boolean;
    default?: any;
}

export interface EnumablePropertyBase<T> {
    enum?: T[];
    enumNames?: string[];
}

export interface StringProperty extends PropertyBase, EnumablePropertyBase<string> {
    type: "string";
}

export interface NumberProperty extends PropertyBase, EnumablePropertyBase<number> {
    type: "number";
}

export interface BooleanProperty extends PropertyBase, EnumablePropertyBase<boolean> {
    type: "boolean";
}

export interface ArrayProperty extends PropertyBase {
    type: "array";
    items: Property;
    enum?: never;
}

export interface ObjectProperty extends PropertyBase {
    type: "object";
    properties: {[name: string]: Property};
    required?: string[];
    enum?: never;
}
