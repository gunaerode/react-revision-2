import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { LessonMeta } from "../types/lesson.types";
import { lessonMeta } from "./meta";

/** "28a" for the 28a submenu lesson, "7" for 07 - taken from the id prefix. */
export function lessonLabel(meta: Pick<LessonMeta, "id">): string {
  return meta.id.split("-")[0].replace(/^0+(?=\d)/, "");
}

/** Lessons in reading order (the order of meta.ts), with previous/next lookups. */
export function neighbours(id: string) {
  const i = lessonMeta.findIndex((m) => m.id === id);
  return {
    index: i,
    prev: i > 0 ? lessonMeta[i - 1] : undefined,
    next: i >= 0 && i < lessonMeta.length - 1 ? lessonMeta[i + 1] : undefined,
  };
}

// ---------------------------------------------------------------------------
// Hash routing: #/18-usestate-hook. Using the hash (instead of real paths)
// works on GitHub Pages with no server config, survives refresh, and makes the
// browser Back button and shareable links work for every lesson.

const LAST_LESSON_KEY = "lastLesson";

function readHash(): string {
  return decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
}

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable - not critical */
  }
}

/** The lesson id in the URL, falling back to the last lesson you opened, then lesson 1. */
export function useActiveLessonId(): [string, (id: string) => void] {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const known = (id: string | null) => !!id && lessonMeta.some((m) => m.id === id);
  const saved = safeGet(LAST_LESSON_KEY);
  const activeId = known(hash) ? hash : known(saved) ? saved! : lessonMeta[0].id;

  const navigate = useCallback((id: string) => {
    if (readHash() !== id) window.location.hash = `/${id}`;
  }, []);

  // Remember where you were, so opening the site again resumes that lesson.
  useEffect(() => {
    safeSet(LAST_LESSON_KEY, activeId);
  }, [activeId]);

  return [activeId, navigate];
}

// ---------------------------------------------------------------------------
// Progress: which lessons you've marked complete, kept in localStorage and
// shared by every component through one tiny external store.

const PROGRESS_KEY = "completedLessons";
const progressListeners = new Set<() => void>();
let progressCache: string[] | null = null;

function readProgress(): string[] {
  if (progressCache) return progressCache;
  try {
    const parsed: unknown = JSON.parse(safeGet(PROGRESS_KEY) ?? "[]");
    progressCache = Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    progressCache = [];
  }
  return progressCache;
}

function subscribeProgress(callback: () => void) {
  progressListeners.add(callback);
  return () => progressListeners.delete(callback);
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribeProgress, readProgress, () => []);

  const toggle = useCallback((id: string) => {
    const current = readProgress();
    progressCache = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    safeSet(PROGRESS_KEY, JSON.stringify(progressCache));
    progressListeners.forEach((l) => l());
  }, []);

  return { completed, isComplete: (id: string) => completed.includes(id), toggle };
}
