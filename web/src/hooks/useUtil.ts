import { useClipboard } from "@vueuse/core";

export const gCopy = async (text: string, message = "复制成功") => {
  const { copy } = useClipboard();
  try {
    await copy(text);
    console.log(message)
  } catch (error) {
    console.log(error);
  }
};
