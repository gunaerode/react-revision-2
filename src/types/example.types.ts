/** A runnable example shown in the "Try it yourself" playground under a lesson. */
export interface LessonExample {
  /** Short name of what the example builds, e.g. "Mood tracker". */
  title: string;
  /** One or two sentences: what to look at in the code and the preview. */
  description: string;
  /** TSX source. Must `export default` the component to render. */
  code: string;
  /** Small follow-up tasks to try by editing the code. */
  challenges: string[];
}
