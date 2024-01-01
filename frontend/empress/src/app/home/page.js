"use client"

import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    router.push("http://127.0.0.1:3000/home/1");
    return (

        < >
            <p>redirekucuts magistus pew pew</p>
        </>

)}
  