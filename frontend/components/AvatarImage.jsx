"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AvatarImagePage() {
const router = useRouter();
const goToProfilePage = () => {
    router.push("/dashboard/profile");
}
  return (
    <div className="avatar cursor-pointer px-2" title="Go to Profile" onClick={goToProfilePage}>
      <div 
      className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2 cursor-pointer"
      >
        <Image
          alt="User profile"
          src="/background.png"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
}
