// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThirdwebProvider } from "thirdweb/react";
// import ParticlesBackground from "./components/ParticlesBackground";
// import Navbar from "./components/Navbar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "CrowdFunding",
//   description:
//     "Starter template for using thirdweb SDK with Next.js App router",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="bg-slate-100 text-slate-700">
//         <ThirdwebProvider>
//           <Navbar/>
//           {children}
//         </ThirdwebProvider>
//       </body>
//     </html>
//   );
// }

// gradient background with particle animation
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrowdFunding",
  description: "Starter template for using thirdweb SDK with Next.js App router",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} relative min-h-screen`}>
//         {/* Gradient background layer */}
//         <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        
//         {/* Particles animation */}
//         <div className="fixed inset-0 -z-10 opacity-30">
//           <ParticlesBackground />
//         </div>
        
//         {/* Content */}
//         <ThirdwebProvider>
//           <div className="relative">
//             <Navbar />
//             {children}
//           </div>
//         </ThirdwebProvider>
//       </body>
//     </html>
//   );
// }


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen`}>
        {/* Slightly darker gradient background */}
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />
        
        {/* Particles with reduced opacity but higher contrast */}
        <div className="fixed inset-0 -z-10 opacity-50"> {/* Increased opacity */}
          <ParticlesBackground />
        </div>
        
        {/* Content */}
        <ThirdwebProvider>
          <div className="relative">
            <Navbar />
            {children}
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}