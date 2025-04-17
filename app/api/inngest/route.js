import { serve } from "inngest/next";
import { inngest, syncDeleteUser, syncUserCreation, syncUserUpdating } from "@/config/inngest.js";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdating,
    syncDeleteUsers
  ],
});
