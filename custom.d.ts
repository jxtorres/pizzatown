declare module "*.png" {
    const value: any;
    export = value;
}

interface RequireContext {
    keys(): string[];
    (id: string): any;
}

declare function requireContext(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
): RequireContext;

declare module 'require.context' {
    export = requireContext;
}

interface NodeRequire {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp): __WebpackModuleApi.RequireContext;
}