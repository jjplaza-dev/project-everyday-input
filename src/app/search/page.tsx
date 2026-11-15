import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { SearchBox } from "@/components/layout/SearchBox";

export const metadata: Metadata = { title: "Search" };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
    const { q } = await searchParams;
    const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
    return (
        <CatalogView
            title={query ? `Search results for “${query}”` : "Search"}
            intro={query ? undefined : "Search by product, brand or connection, such as USB-C."}
            scope={{ kind: "search" }}
        >
            <div className="mt-4 md:hidden">
                <SearchBox />
            </div>
        </CatalogView>
    );
}
