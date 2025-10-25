import "../globals.css";
import { setVariables } from "@/utils/set-variables";
import { getFonts, FontName } from "@/fonts/fonts"; // Dynamic font selection

const domain = "naut.mx";
const variables = await setVariables(domain);
const font = "bergern";

const fonts = getFonts([font]);

let fontClasses = "";

fontClasses += fonts[font].variable;

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontClasses}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: variables! }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}