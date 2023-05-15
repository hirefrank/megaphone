import { Manifest } from "deno-slack-sdk/mod.ts";
import MegaphoneWorkflow from "./workflows/megaphone.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Megaphone",
  description: "A workflow for sending a message to multiple channels.",
  icon: "assets/megaphone.png",
  workflows: [MegaphoneWorkflow],
  outgoingDomains: [],
  datastores: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
