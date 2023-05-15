import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import MegaphoneWorkflow from "../workflows/megaphone.ts";
/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const trigger: Trigger<typeof MegaphoneWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Megaphone",
  description: "Cross-post to multiple channels with ease.",
  workflow: `#/workflows/${MegaphoneWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    user: {
      value: TriggerContextData.Shortcut.user_id,
    },
  },
};

export default trigger;
