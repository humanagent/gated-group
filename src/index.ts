import {
  run,
  agentReply,
  replaceVariables,
  XMTPContext,
  Agent,
} from "@xmtp/message-kit";
import { systemPrompt } from "./prompt.js";
import { gated } from "./skills/gated.js";

// [!region skills]
export const agent: Agent = {
  name: "Ens Agent",
  tag: "@bot",
  description: "A ens agent with a lot of skills.",
  skills: [...gated],
};
run(
  async (context: XMTPContext) => {
    const {
      message: { sender },
      agent,
    } = context;

    let prompt = await replaceVariables(systemPrompt, sender.address, agent);

    await agentReply(context, prompt);
  },
  { agent }
);
