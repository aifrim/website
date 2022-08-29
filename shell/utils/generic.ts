export function cls(...args: (string | null | undefined | symbol | boolean)[]) {
    return args.filter((a) => !!a).join(" ");
}

export async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
