import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";
import { getUserState } from "@/actions/auth";

type InitialData = {
  email: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to Bookwise",
      text: "Thank you for signing up! We are excited to have you on board.",
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We miss you!",
          text: "It seems you haven’t been active for a while. We’d love to have you back!",
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back!",
          text: "We noticed you are active again. Thank you for being with us!",
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
