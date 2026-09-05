import React, { useState } from 'react';
import { User, Calendar, MessageSquare, CheckCircle, Loader2, CheckSquare } from 'lucide-react';
import Barcode from 'react-barcode';
import soundtrackBadge from './assets/soundtrack-badge.png';
import cdDisc from './assets/cd-disc.png';
import './App.css';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYAVCxYDLwaFexVzmzsbTZiEm6wYY9HIrqubniz2reokUbF90lsegwith-sC4QOHK6/exec';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    handle: '',
    isFirstTimer: false
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.handle) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Prevents CORS preflight blocking and redirect errors
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // With mode: 'no-cors', reaching this point means the payload was successfully posted
      setStatus({ type: 'success', message: 'Registration Saved!' });
      setFormData({ name: '', age: '', handle: '', isFirstTimer: false });

    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="case-container">
        {/* Spinning Background CD Disc */}
        <div className="spinning-cd-wrapper">
          <img src={cdDisc} alt="Spinning CD Disc" className="spinning-cd" />
        </div>

        {/* Jewel Case Card */}
        <div className="jewel-case">
          {/* Sticky Note Tapes Positioned Safely Outward */}
          <div className="tag-sticker tape-top-left">
            DON'T WORRY ABOUT ANYTHING;
          </div>
          <div className="tag-sticker tape-top-right">
            INSTEAD, PRAY ABOUT EVERYTHING.
          </div>
          <div className="tag-sticker tape-mid-right">
            TELL GOD WHAT YOU NEED,
          </div>
          <div className="tag-sticker tape-bottom-left">
            AND THANK HIM FOR ALL HE HAS DONE.
          </div>

          {/* Custom Image Badge Replacement */}
          <div className="badge-container">
            <img
              src={soundtrackBadge}
              alt="Soundtrack of U"
              className="soundtrack-badge-img"
            />
          </div>

          {/* Header Section */}
          <div className="header">
            <h1 className="title-serif">
              NEWGEN WORSHIP NIGHT
            </h1>
            <div className="subtitle-bold">
              EVENT REGISTRATION
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <User size={13} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={13} /> Age
              </label>
              <input
                type="number"
                name="age"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MessageSquare size={13} /> Facebook / Messenger Handle
              </label>
              <input
                type="text"
                name="handle"
                required
                value={formData.handle}
                onChange={handleChange}
                placeholder="e.g. m.me/username or FB Name"
                className="form-input"
              />
            </div>

            {/* First Timer Checkbox */}
            <div className="form-group checkbox-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="isFirstTimer"
                  checked={formData.isFirstTimer}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                First time attending Lighthouse Antipolo
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spinner" /> Submitting...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </form>

          {/* Status Alerts */}
          {status.type === 'success' && (
            <div className="alert alert-success">
              <CheckCircle size={15} /> {status.message}
            </div>
          )}

          {status.type === 'error' && (
            <div className="alert alert-error">
              {status.message}
            </div>
          )}

          {/* Barcode & Event Details Footer */}
          <div className="barcode-box">
            <div className="barcode-card">
              <Barcode
                value="PHILIPPIANS 4:6-7"
                format="CODE128"
                width={1.2}
                height={36}
                fontSize={16}
                font="monospace"
                fontOptions="bold"
                background="#ffffff"
                lineColor="#000000"
                margin={4}
              />
            </div>

            <div className="event-details">
              <strong>AUGUST 29 • SAT 6 PM</strong>
              Lighthouse Antipolo Sanctuary
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
