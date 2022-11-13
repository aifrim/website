type LoginContentProps = {
    success: boolean;
};

export default function LoginContent({ success }: LoginContentProps) {
    return (
        <div className="cmd">
            <span className="material-symbols-outlined">
                {success ? "check_circle" : "warning"}
            </span>
            &nbsp;
            {success ? "Login successful" : "Login failed"}
        </div>
    );
}
