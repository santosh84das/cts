export interface IRolesPermissions {
    [name: string]: {
        name: string;
        validationFunction: string[];
    };
}
