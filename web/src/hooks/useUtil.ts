import { useClipboard } from "@vueuse/core";

export const gCopy = async (text: string, message = "ε€εΆζε") => {
  const { copy } = useClipboard();
  try {
    await copy(text);
    console.log(message)
  } catch (error) {
    console.log(error);
  }
};
