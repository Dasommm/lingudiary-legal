(function () {
    var STORAGE_KEY = 'lingudiary-lang';
    var SUPPORTED = ['en', 'ko'];
    var DEFAULT_LANG = 'en';

    function getInitialLang() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
        } catch (e) {}
        return DEFAULT_LANG;
    }

    function applyLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
        document.documentElement.setAttribute('lang', lang);
        var nodes = document.querySelectorAll('[data-lang]');
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].getAttribute('data-lang') === lang) {
                nodes[i].classList.add('lang-active');
            } else {
                nodes[i].classList.remove('lang-active');
            }
        }
        var buttons = document.querySelectorAll('[data-lang-btn]');
        for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].getAttribute('data-lang-btn') === lang) {
                buttons[j].classList.add('active');
                buttons[j].setAttribute('aria-pressed', 'true');
            } else {
                buttons[j].classList.remove('active');
                buttons[j].setAttribute('aria-pressed', 'false');
            }
        }
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
    }

    function init() {
        var buttons = document.querySelectorAll('[data-lang-btn]');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                e.preventDefault();
                applyLang(this.getAttribute('data-lang-btn'));
            });
        }
        applyLang(getInitialLang());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
