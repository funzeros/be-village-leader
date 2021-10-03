import { useClipboard } from "@vueuse/core";
import { gMessage } from ".";

export const gCopy = async (text: string, message = "复制成功") => {
  const { copy } = useClipboard();
  try {
    await copy(text);
    gMessage.info(message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    gMessage.error(error.message);
  }
};
