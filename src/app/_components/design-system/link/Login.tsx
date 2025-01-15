import Link from "./link";
import { LinkTheme } from "./themes";

export default function Login({ theme = "standard" }: { theme?: LinkTheme }) {
  return (
    <Link href="/api/auth/signin" theme={theme}>
      Log in
    </Link>
  );
}
