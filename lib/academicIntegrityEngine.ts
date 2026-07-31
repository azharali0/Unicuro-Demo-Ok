const prohibitedPatterns = [
  /write (the|my) entire (essay|assignment|coursework|dissertation)/i,
  /complete (the|my) assignment for me/i,
  /give me a final submission/i,
  /bypass plagiarism/i,
];

export function evaluateAcademicIntegrityPrompt(prompt: string) {
  const blocked = prohibitedPatterns.some((pattern) => pattern.test(prompt));
  return {
    blocked,
    mode: blocked ? "GUIDED_SUPPORT_ONLY" : "SUPPORTED",
    guidance: blocked
      ? "UniCuro can explain the brief, build an outline, suggest research directions, review your own draft and help with citations, but it will not produce a submission-ready assignment on your behalf."
      : "Academic support is allowed when the student remains responsible for the submitted work.",
  };
}
