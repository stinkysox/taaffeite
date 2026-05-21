import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../data/siteContent";

const SocialIcon: React.FC<{
  href: string;
  children: React.ReactNode;
  label: string;
}> = ({ href, children, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    {children}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="footer-root">
      <style>{`
        .footer-root {
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
          color: #111;
        }

        /* ── Hero band ── */
        .footer-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 24px 64px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          gap: 24px;
        }
        .footer-logo {
          opacity: 0.92;
          transition: opacity 0.3s ease;
        }
        .footer-logo:hover { opacity: 1; }
        .footer-tagline {
          font-size: 10px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          font-weight: 500;
          text-align: center;
        }
        .footer-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 320px;
        }
        .footer-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent);
        }
        .footer-divider-diamond {
          width: 5px;
          height: 5px;
          background: #d4af37;
          transform: rotate(45deg);
          opacity: 0.7;
          flex-shrink: 0;
        }

        /* ── Social icons ── */
        .social-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.07);
          color: rgba(0,0,0,0.3);
          transition: color 0.3s ease, border-color 0.3s ease, transform 0.25s ease, background 0.3s ease;
          background: transparent;
        }
        .social-icon:hover {
          color: #c6a769;
          border-color: rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.06);
          transform: translateY(-2px);
        }
        .social-row {
          display: flex;
          gap: 10px;
        }

        /* ── Grid ── */
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 48px 24px;
          }
          .footer-col-right {
            text-align: left !important;
          }
          .footer-availability-tag {
            display: inline-block;
          }
        }

        /* ── Column headings ── */
        .footer-col-label {
          font-size: 9px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          font-weight: 700;
          color: #c6a769;
          margin-bottom: 24px;
          display: block;
        }

        /* ── Nav links ── */
        .footer-nav-link {
          display: block;
          font-size: 11px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(0,0,0,0.38);
          margin-bottom: 18px;
          transition: color 0.25s ease, transform 0.25s ease;
          width: fit-content;
        }
        .footer-nav-link:hover {
          color: #c6a769;
          transform: translateX(5px);
        }

        /* ── Contact info ── */
        .footer-contact-item {
          display: block;
          font-size: 14px;
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: rgba(0,0,0,0.45);
          margin-bottom: 14px;
          transition: color 0.25s ease;
          cursor: default;
          line-height: 1.5;
        }
        .footer-contact-item.clickable {
          cursor: pointer;
        }
        .footer-contact-item.clickable:hover { color: #c6a769; }

        /* ── Availability ── */
        .footer-availability-text {
          font-size: 14px;
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: rgba(0,0,0,0.45);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .footer-availability-tag {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          color: #c6a769;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          background: rgba(212,175,55,0.04);
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 32px;
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .footer-meta {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
          font-weight: 400;
          text-align: center;
        }
        .footer-meta-links {
          display: flex;
          gap: 24px;
        }
        .footer-meta-link {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.25);
          transition: color 0.25s ease;
        }
        .footer-meta-link:hover { color: #c6a769; }
      `}</style>

      {/* ── Hero: Logo centrepiece ── */}
      <div className="footer-hero">
        <Link href="/" className="footer-logo">
          <Image
            src="/tafflogo.png"
            alt={siteContent.brand.name}
            width={160}
            height={160}
            style={{ width: 130, height: "auto", display: "block" }}
          />
        </Link>

        <div className="footer-divider">
          <div className="footer-divider-line" />
          <div className="footer-divider-diamond" />
          <div className="footer-divider-line" />
        </div>

        <p className="footer-tagline">{siteContent.footer.description}</p>

        <div className="social-row">
          {/* Instagram */}
          <SocialIcon href={siteContent.footer.socials[0].url} label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </SocialIcon>
          {/* YouTube */}
          <SocialIcon href={siteContent.footer.socials[1].url} label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </SocialIcon>
          {/* WhatsApp */}
          <SocialIcon href={siteContent.footer.socials[2].url} label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </SocialIcon>
          {/* Pinterest */}
          <SocialIcon href={siteContent.footer.socials[3].url} label="Pinterest">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 0-3.5 19.3c-.1-.8-.2-2.1.1-3 .3-1 1.8-7.6 1.8-7.6s-.5-.9-.5-2.3c0-2.2 1.3-3.8 2.9-3.8 1.4 0 2 1 2 2.2 0 1.4-.9 3.4-1.3 5.3-.4 1.6.8 2.9 2.3 2.9 2.7 0 4.8-2.9 4.8-7 0-3.7-2.6-6.2-6.4-6.2-4.3 0-6.9 3.2-6.9 6.6 0 1.3.5 2.7 1.1 3.5.1.1.1.3.1.4-.1.5-.4 1.6-.4 1.8 0 .3-.1.4-.4.2-1.5-.7-2.4-2.9-2.4-4.7 0-3.8 2.8-7.3 8-7.3 4.2 0 7.5 3 7.5 7 0 4.2-2.6 7.5-6.3 7.5-1.2 0-2.4-.6-2.8-1.4l-.8 2.9c-.3 1.1-1 2.4-1.5 3.2A10 10 0 1 0 12 2z" />
            </svg>
          </SocialIcon>
        </div>
      </div>

      {/* ── Three-column grid ── */}
      <div className="footer-grid">
        {/* Directory */}
        <div>
          <span className="footer-col-label">The Directory</span>
          <nav>
            {siteContent.footer.directory.map((link) => (
              <Link key={link.path} href={link.path} className="footer-nav-link">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect */}
        <div>
          <span className="footer-col-label">Connect</span>
          <a
            href={`mailto:${siteContent.footer.contact.email}`}
            className="footer-contact-item clickable"
          >
            {siteContent.footer.contact.email}
          </a>
          <a
            href={`tel:${siteContent.footer.contact.phone}`}
            className="footer-contact-item clickable"
          >
            {siteContent.footer.contact.phone}
          </a>
          <span className="footer-contact-item">
            {siteContent.footer.contact.address}
          </span>
        </div>

        {/* Availability */}
        <div style={{ textAlign: "right" }} className="footer-col-right">
          <span className="footer-col-label">Archive Status</span>
          <p className="footer-availability-text">
            {siteContent.footer.availability.text}
          </p>
          <span className="footer-availability-tag">
            {siteContent.footer.availability.status}
          </span>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-meta">
          &copy; {new Date().getFullYear()} {siteContent.footer.copyright}
        </span>
        <div className="footer-meta-links">
          <Link href="/privacy-policy" className="footer-meta-link">Privacy Policy</Link>
          <Link href="/terms-of-service" className="footer-meta-link">Terms of Service</Link>
        </div>
        <span className="footer-meta">{siteContent.footer.legacies}</span>
      </div>
    </footer>
  );
};