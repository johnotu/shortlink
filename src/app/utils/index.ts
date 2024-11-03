import { toast } from "react-toastify";

export function copyUrl({ url }: { url: string }) {
  navigator.clipboard.writeText(url);
  toast.success("URL copied to clipboard.", { autoClose: 1000 });
}
