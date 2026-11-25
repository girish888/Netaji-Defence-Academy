import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, ShieldCheck } from 'lucide-react';
import { academy, courses } from '../data/site';
import { indiaStates } from '../data/india';
import { whatsappMessage, whatsappUrl } from '../lib/logic';

const fields = [
  { name: 'Full Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'Father’s Full Name', type: 'text', autoComplete: 'off', required: true },
  { name: 'Mobile Number', type: 'tel', autoComplete: 'tel-national', required: true },
  { name: 'Father’s Mobile Number', type: 'tel', autoComplete: 'off', required: false },
  { name: 'Date of Birth', type: 'date', autoComplete: 'bday', required: true },
  {
    name: 'Educational Qualification',
    type: 'text',
    autoComplete: 'off',
    required: true,
  },
  {
    name: 'Profession',
    type: 'text',
    autoComplete: 'organization-title',
    required: true,
  },
  { name: 'Email ID', type: 'email', autoComplete: 'email', required: true },
  { name: 'State', type: 'text', autoComplete: 'address-level1', required: true },
  { name: 'District', type: 'text', autoComplete: 'address-level2', required: true },
];

export default function Registration() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (message)
      reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [message]);

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setCopied(false);
    setLink('');
    const data = new FormData(event.currentTarget);
    if (data.get('website')) return;
    const birthDate = String(data.get('Date of Birth'));
    if (birthDate > new Date().toISOString().slice(0, 10)) {
      setError('Date of birth must not be in the future.');
      return;
    }
    for (const field of fields.filter((item) => item.required)) {
      if (!String(data.get(field.name) ?? '').trim()) {
        setError(`Please enter ${field.name.toLowerCase()}.`);
        setMessage('');
        return;
      }
    }
    const details: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      if (!['website', 'consent'].includes(key)) details[key] = String(value);
    }
    const prepared = whatsappMessage(details);
    setMessage(prepared);
    setIsEditing(false);
    if (academy.whatsapp) {
      try {
        setLink(whatsappUrl(academy.whatsapp, prepared));
      } catch {
        setError(
          'The academy WhatsApp number needs to be verified. You can copy your enquiry below.',
        );
      }
    }
  }

  function editEnquiry() {
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function sendToWhatsApp() {
    if (link) window.location.assign(link);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setError(
        'Copy is unavailable in this browser. Select and copy the message text below.',
      );
    }
  }

  return (
    <section className="section container registration-layout">
      <aside className="registration-sidebar">
        <p className="eyebrow">A SIMPLE FIRST STEP</p>
        <h2>
          Let’s get to
          <br />
          know your goals.
        </h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>Share your details</h3>
              <p>Tell us which pathway interests you.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Review your enquiry</h3>
              <p>Check your details before sharing.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Send on WhatsApp</h3>
              <p>You choose when to press Send.</p>
            </div>
          </li>
        </ol>
        <div className="privacy-card">
          <ShieldCheck size={24} />
          <h3>Your details stay in your hands.</h3>
          <p>
            This website does not save your registration details or create a student
            account.
          </p>
        </div>
      </aside>
      <div>
        <form ref={formRef} className="registration-form" onSubmit={prepareEnquiry}>
          <div className="form-heading">
            <h2>Admission enquiry</h2>
            <span>* Required fields</span>
          </div>
          <div className="form-grid">
            {fields.map((field) => (
              <label key={field.name}>
                {field.name}
                {field.required ? ' *' : ' (optional)'}
                {field.name === 'State' ? (
                  <select name={field.name} required defaultValue="">
                    <option value="" disabled>
                      Select your state or UT
                    </option>
                    {indiaStates.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    maxLength={field.type === 'date' ? undefined : 120}
                    pattern={field.type === 'tel' ? '[6-9][0-9]{9}' : undefined}
                    title={
                      field.type === 'tel'
                        ? 'Enter a 10-digit Indian mobile number starting with 6–9.'
                        : undefined
                    }
                    placeholder={
                      field.name === 'District' ? 'Enter your district' : undefined
                    }
                  />
                )}
              </label>
            ))}
            <label>
              Preferred Course *
              <select
                name="Preferred Course"
                required
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value)}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courses.map((course) => (
                  <option key={course.id}>{course.name}</option>
                ))}
              </select>
              {selectedCourse && (
                <span className="age-criteria">
                  <strong>Age guidance:</strong>{' '}
                  {courses.find((course) => course.name === selectedCourse)?.ageCriteria}
                </span>
              )}
            </label>
            <label>
              Gender *
              <select name="Gender" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {['Female', 'Male', 'Other', 'Prefer not to say'].map((gender) => (
                  <option key={gender}>{gender}</option>
                ))}
              </select>
            </label>
            <label>
              Hostel Required *
              <select name="Hostel Required" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label className="full-width">
              Message (optional)
              <textarea name="Message" rows={4} maxLength={1500} />
            </label>
          </div>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this field empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div id="privacy" className="privacy-notice">
            <p>
              <strong>Before you continue</strong>
            </p>
            <p>
              Click to Chat puts your details into a WhatsApp URL. WhatsApp handles
              information under its privacy policy. Review the message before sending. No
              enquiry is submitted until you press Send in WhatsApp.
            </p>
            <label className="checkbox-label">
              <input name="consent" type="checkbox" required />I understand and agree to
              prepare my details for sharing with the academy.
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" type="submit">
            {isEditing ? 'Update & review enquiry' : 'Review registration enquiry'}{' '}
            <ArrowUpRight size={18} />
          </button>
        </form>
        {message && (
          <section ref={reviewRef} className="review-panel" aria-live="polite">
            <h2>Review your enquiry</h2>
            <p className="review-intro">
              Check everything below. Edit any detail before sending it directly to the
              academy’s WhatsApp.
            </p>
            <pre tabIndex={0}>{message}</pre>
            <div className="review-actions">
              {link ? (
                <button
                  className="button button-gold"
                  type="button"
                  onClick={sendToWhatsApp}
                >
                  Send directly to WhatsApp <ArrowUpRight size={18} />
                </button>
              ) : (
                <p className="verification-note">
                  Sending is unavailable until the academy confirms its WhatsApp number.
                  Your enquiry has not been submitted.
                </p>
              )}
              <button
                className="button button-outline"
                type="button"
                onClick={editEnquiry}
              >
                Edit details
              </button>
              <button
                className="button button-outline"
                type="button"
                onClick={copyMessage}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? 'Copied' : 'Copy enquiry'}
              </button>
            </div>
            <p className="fine-print">
              Your details are not saved by this website. WhatsApp opens with the reviewed
              message ready for you to send.
            </p>
          </section>
        )}
      </div>
    </section>
  );
}
