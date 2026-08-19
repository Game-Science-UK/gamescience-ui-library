import { NavLink, Outlet, Link } from "react-router-dom";

import { VERSION, byCategory, CATEGORY_LABEL, catalogue } from "@site/lib/registry";
import { previews } from "@site/previews";

const STORYBOOK_URL = "/gamescience-ui-library/storybook/";

function TopNav() {
  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors ${
      isActive ? "bg-site-raised text-site-fg" : "text-site-muted hover:text-site-fg"
    }`;

  return (
    <header className="border-site-border bg-site-bg/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="text-site-fg text-sm font-semibold tracking-tight">GameScience UI</span>
          <span className="bg-site-raised font-site-mono text-site-muted rounded px-1.5 py-0.5 text-[11px]">
            {VERSION}
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/get-started" className={link}>
            Get started
          </NavLink>
          <NavLink to="/manage" className={link}>
            Manage
          </NavLink>
          <NavLink to="/components" className={link}>
            Components
          </NavLink>
          <NavLink to="/skills" className={link}>
            Skills
          </NavLink>
          <NavLink to="/docs" className={link}>
            Docs
          </NavLink>
          <a
            href={STORYBOOK_URL}
            className="text-site-muted hover:text-site-fg rounded-md px-3 py-1.5 text-sm transition-colors"
          >
            Storybook
          </a>
        </nav>
      </div>
    </header>
  );
}

function Sidebar() {
  const groups = byCategory();
  const link = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between rounded px-2 py-1 text-[13px] transition-colors ${
      isActive ? "bg-site-raised text-site-fg" : "text-site-muted hover:text-site-fg"
    }`;

  return (
    <aside className="border-site-border hidden w-60 shrink-0 border-r lg:block">
      <div className="site-scroll-hidden sticky top-[57px] max-h-[calc(100vh-57px)] overflow-auto px-4 py-6">
        {groups.map((group) => (
          <div key={group.category} className="mb-6">
            <p className="text-site-dim mb-2 px-2 text-[11px] uppercase tracking-wider">
              {CATEGORY_LABEL[group.category]}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((name) => (
                <li key={name}>
                  <NavLink to={`/components/${name}`} className={link}>
                    <span className="truncate">{catalogue[name]?.title ?? name}</span>
                    {previews[name] ? null : (
                      <span
                        title="No live preview yet"
                        className="bg-site-border-strong ml-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function Layout() {
  return (
    <div className="bg-site-bg font-site text-site-fg min-h-screen antialiased">
      <TopNav />
      <div className="mx-auto flex max-w-[1400px]">
        {/* The catalogue is the site's spine, so it stays available from every
            page rather than only from component routes. */}
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
