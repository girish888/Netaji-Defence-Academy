import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/site';

const categories = ['All', 'Training', 'Classrooms', 'Campus', 'Hostel', 'Events'];

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = galleryImages.filter(
    (image) => category === 'All' || image.category === category,
  );

  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [selected]);

  function close() {
    setSelected(null);
    trigger.current?.focus();
  }

  return (
    <section className="section container">
      <div className="filter-tabs" aria-label="Gallery category">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="fine-print">
        Client-supplied references. These are not independently verified photographs of
        academy facilities.
      </p>
      <div className="gallery-grid">
        {visible.map((image, index) => (
          <button
            className="gallery-item"
            type="button"
            key={image.src}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
            }}
            aria-label={`Enlarge ${image.title}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width="1280"
              height="960"
              loading="lazy"
            />
            <span>
              {image.title}
              <ArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <div>
            <h2>Photographs coming soon.</h2>
            <p>Approved {category.toLowerCase()} photographs have not been provided.</p>
          </div>
        </div>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Enlarged gallery image"
        onCancel={close}
        onClose={() => {
          if (selected !== null) close();
        }}
        onKeyDown={(event) => {
          if (selected === null) return;
          if (event.key === 'ArrowRight') setSelected((selected + 1) % visible.length);
          if (event.key === 'ArrowLeft')
            setSelected((selected - 1 + visible.length) % visible.length);
        }}
      >
        <button
          className="lightbox-close"
          type="button"
          onClick={close}
          aria-label="Close image"
        >
          <X />
        </button>
        {selected !== null && visible[selected] && (
          <>
            <img src={visible[selected].src} alt={visible[selected].alt} />
            <div className="lightbox-controls">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setSelected((selected - 1 + visible.length) % visible.length)
                }
              >
                <ChevronLeft />
              </button>
              <p>{visible[selected].title}</p>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setSelected((selected + 1) % visible.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
