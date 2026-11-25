/* Nothing in the modal slot unless an intercepted route fills it. Without this
 * file the slot has no match on a hard navigation and the route 404s. */
export default function Default() {
  return null;
}
