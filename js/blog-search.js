// Blog Search Functionality
(function() {
  'use strict';

  // Article database
  const articles = [
    {
      title: "Slop: La papilla digital que atrofia nuestro pensamiento",
      excerpt: "Reflexión sobre el 'slop' digital, contenido generado por IA de baja calidad que está transformando nuestro consumo de información y afectando nuestra capacidad crítica.",
      category: "ia etica",
      tags: ["IA", "Ética", "Cultura"],
      url: "/blog/articulos/slop-papilla-digital.html",
      date: "2026-02-01",
      readingTime: "25 min"
    },
    {
      title: "ChatGPT y Claude para profesores de ELE",
      excerpt: "Guía práctica para usar ChatGPT y Claude en clases de español. Comparación de herramientas, prompts estructurados y estrategias para integrar IA en la enseñanza.",
      category: "educacion ia",
      tags: ["ChatGPT", "Claude", "ELE"],
      url: "/blog/articulos/chatgpt-claude-profesores-ele.html",
      date: "2026-01-25",
      readingTime: "6 min"
    },
    {
      title: "Prompt engineering básico para educadores",
      excerpt: "Aprende las bases del prompt engineering aplicadas a educación. Estructura de prompts efectivos, frameworks útiles y ejemplos prácticos para crear materiales didácticos.",
      category: "prompts educacion",
      tags: ["Prompts", "Educación", "IA"],
      url: "/blog/articulos/prompt-engineering-basico.html",
      date: "2026-01-18",
      readingTime: "15 min"
    },
    {
      title: "Ética de la IA en educación: guía para uso responsable",
      excerpt: "Reflexión sobre los dilemas éticos de usar inteligencia artificial en educación: sesgos, privacidad, dependencia e integridad académica.",
      category: "etica educacion ia",
      tags: ["Ética", "IA", "Educación"],
      url: "/blog/articulos/etica-ia-educacion.html",
      date: "2026-01-11",
      readingTime: "20 min"
    },
    {
      title: "Agentes de IA: El futuro de la enseñanza personalizada",
      excerpt: "Exploración de cómo los agentes de inteligencia artificial pueden transformar la educación personalizada. Qué son, cómo funcionan y aplicaciones prácticas en ELE.",
      category: "ia educacion",
      tags: ["Agentes IA", "IA", "Educación"],
      url: "/blog/articulos/agentes-ia-ensenanza.html",
      date: "2026-01-04",
      readingTime: "16 min"
    }
  ];

  // Initialize search
  function initSearch() {
    const searchInput = document.getElementById('blogSearch');
    const searchBtn = document.getElementById('searchBtn');
    const articlesGrid = document.getElementById('articlesGrid');

    if (!searchInput || !articlesGrid) return;

    // Search function
    function performSearch(query) {
      const normalizedQuery = query.toLowerCase().trim();

      if (normalizedQuery === '') {
        renderArticles(articles);
        return;
      }

      const filtered = articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
        const excerptMatch = article.excerpt.toLowerCase().includes(normalizedQuery);
        const tagMatch = article.tags.some(tag =>
          tag.toLowerCase().includes(normalizedQuery)
        );
        const categoryMatch = article.category.toLowerCase().includes(normalizedQuery);

        return titleMatch || excerptMatch || tagMatch || categoryMatch;
      });

      renderArticles(filtered);

      // Show "no results" message if needed
      if (filtered.length === 0) {
        articlesGrid.innerHTML = `
          <div class="no-results" style="grid-column: 1/-1;">
            <p style="font-size: 1.1rem;">No se encontraron artículos para "${query}"</p>
            <p style="margin-top: 0.5rem;">
              Intenta con otros términos o
              <a href="/blog/" style="color: var(--accent);">ver todos los artículos</a>
            </p>
          </div>
        `;
      }
    }

    // Render articles
    function renderArticles(articlesToRender) {
      articlesGrid.innerHTML = articlesToRender.map(article => `
        <article class="article-card" data-category="${article.category}">
          <div class="card-meta">
            <time datetime="${article.date}">${formatDate(article.date)}</time>
            <span class="reading-time">${article.readingTime}</span>
          </div>
          <h2><a href="${article.url}">${article.title}</a></h2>
          <p>${article.excerpt}</p>
          <div class="card-tags">
            ${article.tags.map(tag => `<a href="/blog/etiquetas/${tagToSlug(tag)}.html" class="tag">${tag}</a>`).join('')}
          </div>
        </article>
      `).join('');
    }

    // Format date
    function formatDate(dateString) {
      const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // Convert tag to slug
    function tagToSlug(tag) {
      return tag.toLowerCase()
        .replace(/ /g, '-')
        .replace(/ía/g, 'ia')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    // Event listeners
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
        // Reset filters when searching
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
      }, 300);
    });

    searchBtn.addEventListener('click', () => {
      performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });

    // Initial render
    renderArticles(articles);
  }

  // Filter functionality
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articlesGrid = document.getElementById('articlesGrid');

    if (filterBtns.length === 0 || !articlesGrid) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Clear search when filtering
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) searchInput.value = '';

        // Filter articles
        const filter = btn.dataset.filter;
        const articleCards = articlesGrid.querySelectorAll('.article-card');

        articleCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSearch();
      initFilters();
    });
  } else {
    initSearch();
    initFilters();
  }
})();
