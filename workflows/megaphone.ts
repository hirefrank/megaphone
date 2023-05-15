import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { MegaphoneFunctionDefinition } from "../functions/megaphone_function.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/automation/forms#add-interactivity
 */
const MegaphoneWorkflow = DefineWorkflow({
  callback_id: "sample_workflow",
  title: "Megaphone",
  description: "A workflow for sending a message to multiple channels.",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["user", "interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * OpenForm Slack function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = MegaphoneWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send message to channels",
    interactivity: MegaphoneWorkflow.inputs.interactivity,
    submit_label: "Send message",
    fields: {
      elements: [{
        name: "channels",
        title: "Channels to send message to",
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.channel_id,
        },
      }, {
        name: "message",
        title: "Message",
        type: Schema.types.string,
        long: true,
      }],
      required: ["channels", "message"],
    },
  },
);

// /**
//  * Custom functions are reusable building blocks
//  * of automation deployed to Slack infrastructure. They
//  * accept inputs, perform calculations, and provide
//  * outputs, just like typical programmatic functions.
//  * https://api.slack.com/automation/functions/custom
//  */
MegaphoneWorkflow.addStep(MegaphoneFunctionDefinition, {
  message: inputForm.outputs.fields.message,
  channels: inputForm.outputs.fields.channels,
  user: MegaphoneWorkflow.inputs.user,
});

export default MegaphoneWorkflow;
