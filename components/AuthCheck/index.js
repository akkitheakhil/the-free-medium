import { useAuth } from "@lib/authContext";
import Link from "next/link";

export default function AuthCheck(props) {
    const { username } = useAuth();

    return username ? props.children : props.fallback || <div className='container'>  <Link href="/auth">You must be signed in</Link> </div>;
}