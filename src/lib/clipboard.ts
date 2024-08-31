export function CopyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}
