import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rupam Biswas | Data Scientist & AI Engineer | M.Sc. TU Dortmund, Germany",
  description: "Portfolio of Rupam Biswas — M.Sc. Data Science student at TU Dortmund, Germany. AI Engineer, Data Scientist & Software Engineer specializing in Machine Learning, LLMs, and Banking Systems. Seeking Werkstudent positions in Germany.",
  keywords: [
    "Rupam Biswas",
    "Data Scientist",
    "AI Engineer",
    "M.Sc. Data Science",
    "TU Dortmund",
    "Germany",
    "Machine Learning",
    "Werkstudent",
    "Deep Learning",
    "LLM",
    "Software Engineer",
  ],
  openGraph: {
    title: "Rupam Biswas | Data Scientist & AI Engineer | TU Dortmund, Germany",
    description: "M.Sc. Data Science at TU Dortmund. AI Engineer specializing in ML, LLMs, and Banking Systems. Available for Werkstudent in Germany.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-black text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

