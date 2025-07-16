import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QstashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.qstash.qstashUrl,
  token: config.env.qstash.qstashToken,
});

const client = new QstashClient({ token: config.env.qstash.qstashToken });

export const sendEmail = async ({
  email,
  subject,
  text,
}: {
  email: string;
  subject: string;
  text: string;
}) => {
  await client.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Luka Maisuradze <onboarding@resend.dev>",
      to: ["codeverselm@gmail.com"],
      subject: "Hello World",
      html: "<p>It works!</p>",
    },
  });
};
