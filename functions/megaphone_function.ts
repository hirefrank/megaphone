import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const MegaphoneFunctionDefinition = DefineFunction({
  callback_id: "megaphone_function",
  title: "Megaphone function",
  description: "A function for posting the same message to multiple channels.",
  source_file: "functions/megaphone_function.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
      channels: {
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.channel_id,
        },
        description: "Channels for the message to be posted",
      },
      user: {
        type: Schema.slack.types.user_id,
        description: "The user invoking the workflow",
      },
    },
    required: ["message", "channels", "user"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  MegaphoneFunctionDefinition,
  ({ inputs, client }) => {
    const channels: string[] = inputs.channels;
    const message = `_*From <@${inputs.user}>*:_ \n> ${inputs.message}`;

    channels.forEach(async function (channel) {
      const msgResponse = await client.chat.postMessage({
        channel: channel,
        mrkdwn: true,
        text: message,
      });

      if (!msgResponse.ok) {
        console.log(
          "Error during request chat.postMessage!",
          msgResponse.error,
        );
      }
    });
    return { outputs: {} };
  },
);
