import { useState } from "react";

import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const notes = [
  {
    eyebrow: "A LITTLE REMINDER",
    title: "Progress over perfection.",
    body: "Focus on the next small step. Consistency is more powerful than a perfect plan.",
    theme: "lavender",
  },
  {
    eyebrow: "YOUR DAILY FOCUS",
    title: "One thing at a time.",
    body: "Give your attention to the task in front of you. Make space for the next one later.",
    theme: "peach",
  },
  {
    eyebrow: "KEEP GOING",
    title: "You are making progress.",
    body: "Every completed task is a promise you kept to yourself. Take a moment to notice it.",
    theme: "mint",
  },
];

export default function FocusNotes() {
  const [active, setActive] = useState(0);

  const moveSlide = (direction) => {
    setActive((current) => (current + direction + notes.length) % notes.length);
  };

  const note = notes[active];

  return (
    <section className="focus-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A MOMENT FOR YOU</span>
          <h2>Focus notes</h2>
        </div>

        <div className="carousel-controls">
          <button
            className="icon-button"
            type="button"
            onClick={() => moveSlide(-1)}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            className="icon-button"
            type="button"
            onClick={() => moveSlide(1)}
            aria-label="Next focus note"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div
        className={`focus-note ${note.theme}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="note-icon">
          <Lightbulb size={23} />
        </div>

        <div className="note-copy">
          <span>{note.eyebrow}</span>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
        </div>

        <div className="note-pagination">
          {notes.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`pagination-dot ${index === active ? "selected" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
