import { getBaseUrl } from "@/lib/base-url";
import { BuyButton } from "@/components/buy-button";
import { BookOpen } from "lucide-react";

interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  coverUrl: string | null;
}

export default async function BooksPage() {
  const res = await fetch(`${getBaseUrl()}/api/books`, { cache: "no-store" });
  const books: Book[] = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black text-[#0B0F3A] md:text-5xl">
          Prediction kitoblar
        </h1>
        <p className="mt-4 text-[#0B0F3A]/70">
          Eng ehtimolli mavzular va savollar to'plangan kitoblar.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="soft-card flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-[#0B0F3A] to-[#1c2678]">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center text-white">
                  <BookOpen size={48} className="mx-auto mb-2 opacity-80" />
                  <span className="text-sm font-semibold opacity-80">TARGET</span>
                </div>
              )}
              <div className="absolute left-3 top-3 rounded-lg bg-[#E60012] px-2.5 py-1 text-xs font-bold text-white">
                PDF
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-bold text-[#0B0F3A]">{book.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-[#0B0F3A]/70">
                {book.description}
              </p>
              <div className="mt-4 text-xl font-black text-[#E60012]">
                {Number(book.price).toLocaleString("uz-UZ")} so'm
              </div>
              <div className="mt-4 mt-auto">
                <BuyButton type="book" itemId={book.id} amount={book.price} label="Kitobni sotib olish" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
