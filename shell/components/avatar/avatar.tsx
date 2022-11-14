import Image from "next/image";

type AvatarProps = {
    size: number;
    priority?: boolean;
};

export default function Avatar({ size, priority }: AvatarProps) {
    return (
        <Image
            src="https://en.gravatar.com/userimage/25737532/91d0e8c879a3c411c4c7b0c1bba9e8d4.png"
            alt="Alexandru Ifrim"
            width={size}
            height={size}
            priority={priority}
        />
    );
}
