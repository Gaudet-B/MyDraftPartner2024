import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "~/server/api/root";
/** @TODO delete file */
export const api = createTRPCReact<AppRouter>();
