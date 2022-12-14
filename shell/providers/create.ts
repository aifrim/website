import {
    Context,
    createContext,
    createElement,
    Provider,
    useContext,
} from "react";
import { WithChildren } from "../definitions";

export interface CreateContextOptions {
    /**
     * If `true`, React will throw if context is `null` or `undefined`
     * In some cases, you might want to support nested context, so you can set it to `false`
     */
    strict?: boolean;

    /**
     * Error message to throw if the context is `undefined`
     */
    errorMessage?: string;

    /**
     * The display name of the context
     */
    name?: string;
}

type ProviderWrapped = (props: WithChildren) => JSX.Element;
type WithValue<T> = [ProviderWrapped, () => T, Context<T>];
type WithoutValue<T> = [Provider<T>, () => T, Context<T>];

function createHook<T>(
    Context: Context<T | undefined>,
    strict: boolean,
    errorMessage: string,
    name?: string
) {
    const useContextWrapper = () => {
        const context = useContext(Context);

        if ((context === null || context === undefined) && strict) {
            const error = new Error(errorMessage);
            error.name = "ContextError";
            Error.captureStackTrace?.(error, useContextWrapper);
            throw error;
        }

        return context;
    };

    useContextWrapper.displayName = `use${name ?? "Context"}`;

    return useContextWrapper;
}

function createWrappedProvider<T>(
    Context: Context<T | undefined>,
    useValue: () => T,
    name?: string
) {
    const ProviderWrapper = ({ children }: WithChildren) => {
        const value = useValue();
        return createElement(Context.Provider, { value }, children);
    };

    ProviderWrapper.displayName = `${name ?? ""}ProviderWrapper`;

    return ProviderWrapper;
}

function createErrorMessage(name?: string) {
    let hook = "useContext";
    if (name) {
        hook = "use" + name;
    }

    let context = "Context";

    if (name) {
        context = name + "Context";
    }

    return `${hook}: \`${context}\` is undefined. Seems you forgot to wrap component within the Provider`;
}

export function createContextProvider<Type>(
    options: CreateContextOptions,
    useValue: () => Type
): WithValue<Type>;

export function createContextProvider<Type>(
    options: CreateContextOptions
): WithoutValue<Type>;

export function createContextProvider<Type>(
    options: CreateContextOptions = {},
    useValue?: () => Type
) {
    const {
        name,
        strict = true,
        errorMessage = createErrorMessage(name),
    } = options;

    const Context = createContext<Type | undefined>(undefined);
    Context.displayName = name + "Context";

    const useContextWrapper = createHook(Context, strict, errorMessage, name);

    if (useValue != null) {
        const Provider = createWrappedProvider(Context, useValue, name);
        return [Provider, useContextWrapper, Context] as WithValue<Type>;
    }

    return [Context.Provider, useContextWrapper, Context] as WithoutValue<Type>;
}
