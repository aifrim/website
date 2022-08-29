export type CommandCall = {
    // arguments: string[];
    // cwd: string;
    history?: boolean;
};

export type Command = {
    name: string;
    description: string;
    component: (props: CommandCall) => JSX.Element | null;
};
