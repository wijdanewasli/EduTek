- Keep EduTek as a frontend-only role-based prototype with local sample data until an API is explicitly connected, because the current scope is interface generation from the specification.
- Keep role-specific navigation in a shared workspace layout and each pedagogical section in its own TanStack file route, because complete school workflows need addressable pages rather than cosmetic dashboard tabs.
- Keep sample state in a shared React provider and domain calculations in browser-safe pure helpers, because prototype changes must read back across pages without implying server persistence or security.
- Generate downloadable sample reports in the browser, because exports should work without introducing a backend in this frontend-only scope.

- Route each pedagogical section through a shared section dispatcher and individual static file routes, using a typed navigation map to keep deep links and role-specific presentation consistent.
- Sign-in is a frontend demo check against fixed sample accounts kept in session storage, because no backend is connected yet.
