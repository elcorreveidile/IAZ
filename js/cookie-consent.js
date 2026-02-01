// Cookie Consent Banner for javier.soy
// GDPR Compliant - Google Analytics 4 Integration

(function() {
  'use strict';

  // Configuration
  const config = {
    bannerId: 'cookie-consent-banner',
    consentKey: 'cookie-consent',
    debug: false
  };

  // Consent states
  const Consent = {
    UNKNOWN: 'unknown',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
  };

  // Get current consent state
  function getConsent() {
    try {
      const stored = localStorage.getItem(config.consentKey);
      return stored || Consent.UNKNOWN;
    } catch (e) {
      return Consent.UNKNOWN;
    }
  }

  // Save consent state
  function setConsent(state) {
    try {
      localStorage.setItem(config.consentKey, state);
    } catch (e) {
      console.error('Error saving consent:', e);
    }
  }

  // Check if user has already decided
  function hasConsent() {
    const state = getConsent();
    return state === Consent.ACCEPTED || state === Consent.REJECTED;
  }

  // Update Google Analytics based on consent
  function updateAnalytics(consented) {
    if (typeof gtag === 'function') {
      if (consented) {
        // User accepted - enable analytics
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        if (config.debug) console.log('✓ GA: Analytics enabled');
      } else {
        // User rejected - disable analytics
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        if (config.debug) console.log('✗ GA: Analytics disabled');
      }
    }
  }

  // Hide banner
  function hideBanner() {
    const banner = document.getElementById(config.bannerId);
    if (banner) {
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);
    }
  }

  // Show banner
  function showBanner() {
    const banner = document.getElementById(config.bannerId);
    if (banner) {
      banner.style.display = 'flex';
      setTimeout(() => {
        banner.style.opacity = '1';
      }, 10);
    }
  }

  // Handle accept
  function acceptConsent() {
    setConsent(Consent.ACCEPTED);
    updateAnalytics(true);
    hideBanner();
  }

  // Handle reject
  function rejectConsent() {
    setConsent(Consent.REJECTED);
    updateAnalytics(false);
    hideBanner();
  }

  // Create banner HTML and CSS
  function createBanner() {
    // Don't create if already exists
    if (document.getElementById(config.bannerId)) return;

    // Create banner styles
    const styles = document.createElement('style');
    styles.textContent = `
      #cookie-consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--panel, #0b1224);
        border-top: 1px solid var(--border, #1e293b);
        padding: 1.5rem;
        z-index: 9999;
        display: none;
        flex-direction: column;
        gap: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
      }

      @media (min-width: 640px) {
        #cookie-consent-banner {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
        }
      }

      #cookie-consent-banner .banner-content {
        flex: 1;
        color: var(--muted, #94a3b8);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      #cookie-consent-banner .banner-content p {
        margin: 0;
      }

      #cookie-consent-banner .banner-content a {
        color: var(--accent, #38bdf8);
        text-decoration: none;
        border-bottom: 1px dotted var(--accent);
      }

      #cookie-consent-banner .banner-content a:hover {
        color: var(--fg, #f8fafc);
        border-bottom-style: solid;
      }

      #cookie-consent-banner .banner-buttons {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      #cookie-consent-banner .btn {
        padding: 0.6rem 1.2rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        font-family: inherit;
      }

      #cookie-consent-banner .btn-accept {
        background: var(--accent, #38bdf8);
        color: #0f172a;
      }

      #cookie-consent-banner .btn-accept:hover {
        background: #7dd3fc;
        transform: translateY(-1px);
      }

      #cookie-consent-banner .btn-reject {
        background: rgba(148,163,184,0.1);
        color: var(--fg, #f8fafc);
        border: 1px solid var(--border, #1e293b);
      }

      #cookie-consent-banner .btn-reject:hover {
        background: rgba(148,163,184,0.2);
        border-color: var(--accent, #38bdf8);
      }

      #cookie-consent-banner .btn-config {
        background: transparent;
        color: var(--muted, #94a3b8);
        font-size: 0.8rem;
        padding: 0.6rem 1rem;
      }

      #cookie-consent-banner .btn-config:hover {
        color: var(--accent, #38bdf8);
      }
    `;
    document.head.appendChild(styles);

    // Create banner element
    const banner = document.createElement('div');
    banner.id = config.bannerId;
    banner.innerHTML = `
      <div class="banner-content">
        <p>
          🍪 Este sitio utiliza cookies de Google Analytics para analizar el tráfico.
          Al continuar navegando, aceptas nuestra <a href="/privacidad/">política de privacidad</a>.
          <a href="#" id="cookie-settings" style="margin-left: 0.5rem;">Configurar cookies</a>
        </p>
      </div>
      <div class="banner-buttons">
        <button class="btn btn-accept" id="accept-cookies">
          Aceptar
        </button>
        <button class="btn btn-reject" id="reject-cookies">
          Rechazar
        </button>
      </div>
    `;

    // Insert banner as first element in body
    document.body.insertBefore(banner, document.body.firstChild);

    // Add event listeners
    document.getElementById('accept-cookies').addEventListener('click', acceptConsent);
    document.getElementById('reject-cookies').addEventListener('click', rejectConsent);

    // Settings link (optional - could open modal with more details)
    const settingsLink = document.getElementById('cookie-settings');
    if (settingsLink) {
      settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        // For now, just show info - could expand to modal
        alert('Configuración de cookies:\n\n✓ Analíticas: Google GA4 para estadísticas\n✗ Publicidad: No utilizamos cookies publicitarias\n\nPuedes cambiar tu preferencia anytime borrando las cookies del navegador.');
      });
    }
  }

  // Initialize
  function init() {
    if (hasConsent()) {
      // User already decided - apply their choice
      const state = getConsent();
      const consent = state === Consent.ACCEPTED;
      updateAnalytics(consent);
      if (config.debug) console.log('✓ Consent exists:', state);
    } else {
      // No decision yet - show banner
      if (config.debug) console.log('○ No consent found - showing banner');
      createBanner();

      // Wait for page to load before showing banner
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', showBanner);
      } else {
        // Small delay for better UX
        setTimeout(showBanner, 1000);
      }
    }
  }

  // Run initialization
  init();

  // Expose API globally (in case user wants to manually change consent)
  window.CookieConsent = {
    accept: acceptConsent,
    reject: rejectConsent,
    reset: function() {
      localStorage.removeItem(config.consentKey);
      location.reload();
    },
    getState: getConsent
  };

})();
