import Link from "next/link";
import { getAnnouncement, getFooterGroups, getSiteIdentity } from "@/data/selectors/site";

export function AnnouncementBar() {
  return (
    <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
      {getAnnouncement()}
    </div>
  );
}

export function Footer() {
  const { name, tagline } = getSiteIdentity();
  return (
    <footer className="on-dark mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="text-display text-2xl">{name}</p>
          <p className="mt-2 max-w-xs text-sm text-primary-foreground/80">{tagline}</p>
        </div>
        {getFooterGroups().map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="mt-3 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-primary-foreground/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-4 text-xs text-primary-foreground/70">
          Prototype storefront. Sample products, prices, reviews and policies are placeholders.
        </p>
      </div>
    </footer>
  );
}
