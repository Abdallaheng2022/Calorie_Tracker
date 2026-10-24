export * from "./TrackPage.jsx"
export * from "./LandingPage.jsx"
export * from "./PageLayout.jsx"
export * from "./ErrorPage.jsx"
export * from "./DetailPage.jsx"
/**
 * Barrel File (Barrel = برميل):
 * ملف بيجمّع الـ exports من ملفات الفولدر ويعيد تصديرها من مكان واحد،
 * زي برميل بتحط فيه كل حاجة وتاخد منه اللي محتاجه.
 * لما تعمل import من الفولدر من غير اسم ملف، بيتقري الـ index.js تلقائياً.
 *
 * فوائده:
 * 1. imports أنضف وأقصر (سطر واحد بدل سطور كتير)
 * 2. لو غيّرت مكان أو اسم ملف، بتعدّل هنا بس
 * 3. بيحدد الـ public API للفولدر (اللي مش متصدّر هنا مش للاستخدام برّه)
 * 4. تنظيم أحسن للمشروع وخصوصاً الكبير
 *
 * مثال:
 *   ❌ بدل:
 *     import Button from './components/Button/Button';
 *     import Card from './components/Card/Card';
 *
 *   ✅ بقت:
 *     import { Button, Card } from './components';
 *
 * ⚠️ ملحوظة: الملفات اللي جوه الفولدر ده تعمل import من بعض مباشرة، مش من الـ index
 */