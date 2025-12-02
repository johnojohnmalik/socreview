/**
 * SOC Interview Prep - Vanilla JavaScript
 * Minimal, fast, dependency-free
 */

(function() {
    'use strict';

    // DOM elements
    const searchInput = document.getElementById('search');
    const cards = document.querySelectorAll('.card');

    // =====================================
    // Card Toggle (Expand/Collapse)
    // =====================================
    
    /**
     * Toggle card expanded/collapsed state
     * @param {HTMLElement} card - Card element to toggle
     */
    function toggleCard(card) {
        card.classList.toggle('collapsed');
    }

    // Add click handlers to all card titles
    cards.forEach(card => {
        const title = card.querySelector('.card-title');
        title.addEventListener('click', () => toggleCard(card));
    });

    // =====================================
    // Search Functionality
    // =====================================
    
    /**
     * Filter cards based on search query
     * Searches title, content, and data-tags attribute
     * @param {string} query - Search string
     */
    function filterCards(query) {
        const searchTerm = query.toLowerCase().trim();

        cards.forEach(card => {
            // Get searchable text
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const content = card.querySelector('.card-content').textContent.toLowerCase();
            const tags = (card.dataset.tags || '').toLowerCase();
            
            // Check if any field matches
            const matches = !searchTerm || 
                title.includes(searchTerm) || 
                content.includes(searchTerm) || 
                tags.includes(searchTerm);

            // Show/hide card
            card.classList.toggle('hidden', !matches);

            // Auto-expand matching cards when searching
            if (matches && searchTerm) {
                card.classList.remove('collapsed');
            }
        });
    }

    // Debounce search for performance
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterCards(e.target.value);
        }, 150); // 150ms debounce
    });

    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterCards('');
            searchInput.blur();
        }
    });

    // =====================================
    // Keyboard Navigation
    // =====================================
    
    // Focus search with '/' key (like GitHub)
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // =====================================
    // Expand/Collapse All
    // =====================================
    
    /**
     * Expand or collapse all cards
     * @param {boolean} collapse - True to collapse, false to expand
     */
    function setAllCards(collapse) {
        cards.forEach(card => {
            card.classList.toggle('collapsed', collapse);
        });
    }

    // Double-click header to toggle all
    document.querySelector('header').addEventListener('dblclick', () => {
        // Check if most cards are collapsed
        const collapsedCount = document.querySelectorAll('.card.collapsed').length;
        const shouldExpand = collapsedCount > cards.length / 2;
        setAllCards(!shouldExpand);
    });

    // =====================================
    // Initialize
    // =====================================
    
    // Start with all cards expanded (better UX for study material)
    // Cards start expanded by default (no collapsed class in HTML)
    
    // Focus search on page load for quick access
    // Commented out to not be intrusive on mobile
    // searchInput.focus();

    console.log('SOC Interview Prep loaded successfully!');
    console.log('Tip: Press "/" to focus search, Escape to clear');
    console.log('Tip: Double-click header to expand/collapse all');

})();

